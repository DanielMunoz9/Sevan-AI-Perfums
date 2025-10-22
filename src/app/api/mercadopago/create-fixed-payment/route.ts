import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || "";
const client = new MercadoPagoConfig({
  accessToken,
  options: {
    timeout: 5000,
  },
});

const preference = new Preference(client);

const getSiteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const parseQuantity = (value: unknown): number => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return 1;
  }
  return Math.floor(numeric);
};

const serializeMercadoPagoError = (error: unknown) => {
  const fallback = {
    message: "MercadoPago respondió con un error",
    status: 500,
    detail: undefined as string | undefined,
    cause: undefined as Array<{ code?: string; description?: string }> | undefined,
  };

  if (!error) {
    return fallback;
  }

  if (typeof error === "string") {
    return { ...fallback, message: error };
  }

  if (error instanceof Error) {
    return { ...fallback, message: error.message };
  }

  if (typeof error === "object") {
    const err = error as Record<string, any>;

    if (typeof err.message === "string") {
      fallback.message = err.message;
    }

    if (typeof err.status === "number") {
      fallback.status = err.status;
    } else if (typeof err.statusCode === "number") {
      fallback.status = err.statusCode;
    }

    if (err.error) {
      if (typeof err.error === "string") {
        fallback.detail = err.error;
      } else if (typeof err.error === "object" && typeof err.error.message === "string") {
        fallback.detail = err.error.message;
      }
    }

    if (!fallback.detail && typeof err.detail === "string") {
      fallback.detail = err.detail;
    }

    if (Array.isArray(err.cause)) {
      fallback.cause = err.cause
        .map((item: any) => ({
          code: typeof item?.code === "string" ? item.code : undefined,
          description: typeof item?.description === "string" ? item.description : undefined,
        }))
        .filter((item) => item.code || item.description);
    }
  }

  return fallback;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { product, customer, quantity = 1 } = body ?? {};

    if (!accessToken) {
      return NextResponse.json(
        { error: "MercadoPago access token is not configured" },
        { status: 500 }
      );
    }

    if (!product?.id || product.price === undefined) {
      return NextResponse.json(
        { error: "Product id and price are required" },
        { status: 400 }
      );
    }

    if (!customer?.email || !customer?.name) {
      return NextResponse.json(
        { error: "Customer name and email are required" },
        { status: 400 }
      );
    }

    const unitPrice = Number(product.price);
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      return NextResponse.json(
        { error: "Product price must be a positive number" },
        { status: 400 }
      );
    }

    const qty = parseQuantity(quantity);
    const normalizedUnitPrice = Math.round(unitPrice);
    const totalAmount = normalizedUnitPrice * qty;

    const orderId = `ORDER-${Date.now()}-${product.id}`;
    const itemTitle = product.visible_title || product.title || "Perfume SEVAN";

    const siteUrl = getSiteUrl();
    const isHttpsSite = siteUrl.startsWith("https://");

    const preferenceData: Record<string, unknown> = {
      items: [
        {
          id: String(product.id),
          title: itemTitle,
          description: product.description ? String(product.description) : undefined,
          quantity: qty,
          unit_price: normalizedUnitPrice,
          currency_id: "COP",
        },
      ],
      payer: {
        name: customer.name,
        email: customer.email,
        phone: {
          number: customer.phone || "3001234567",
        },
      },
      metadata: {
        productId: String(product.id),
        quantity: qty,
        unitPrice,
        totalAmount,
      },
      external_reference: orderId,
      back_urls: {
        success: `${siteUrl}/payment/success`,
        failure: `${siteUrl}/payment/failure`,
        pending: `${siteUrl}/payment/pending`,
      },
      binary_mode: true,
      statement_descriptor: "SEVAN PERFUM",
    };

    if (isHttpsSite) {
      preferenceData.auto_return = 'approved';
      preferenceData.notification_url = `${siteUrl}/api/mercadopago/webhook`;
    }

  const response = await preference.create({ body: preferenceData as any });

    if (!response.id) {
      return NextResponse.json(
        { error: "Unable to create MercadoPago preference" },
        { status: 502 }
      );
    }

    const isSandboxToken = accessToken.trim().startsWith('TEST-');
    const checkoutUrl = isSandboxToken
      ? response.sandbox_init_point || response.init_point
      : response.init_point || response.sandbox_init_point;

    return NextResponse.json({
      success: true,
      preferenceId: response.id,
      checkoutUrl,
      amount: totalAmount,
      orderId,
      currency: "COP",
    });
  } catch (error) {
    console.error("❌ Error al crear preferencia de MercadoPago:", error);
    const serialized = serializeMercadoPagoError(error);
    const status = serialized.status ?? 500;

    return NextResponse.json(
      {
        success: false,
        error: serialized.message,
        status,
        detail: process.env.NODE_ENV !== "production" ? serialized.detail : undefined,
        cause: process.env.NODE_ENV !== "production" ? serialized.cause : undefined,
      },
      { status }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    hasToken: Boolean(accessToken),
    environment: process.env.NODE_ENV || "development",
  });
}
