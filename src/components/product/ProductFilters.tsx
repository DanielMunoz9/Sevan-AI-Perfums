'use client';

import { useMemo, useState } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const CATEGORY_OPTIONS = ['Todos', 'Masculino', 'Femenino', 'Unisex'];
const BRAND_OPTIONS = [
	'SEVÁN PERFUM',
	'Inspirado en Chanel',
	'Inspirado en Dior',
	'Inspirado en Tom Ford',
	'Carolina Herrera',
	'Paco Rabanne'
];
const SCENT_FAMILY_OPTIONS = ['Oriental', 'Floral', 'Amaderada', 'Cítrica', 'Gourmand', 'Acuática', 'Aromática'];

type PriceRange = {
	id: string;
	label: string;
	min: number;
	max: number | null;
};

export interface ProductFiltersState {
	category: string;
	brands: string[];
	scentFamilies: string[];
	priceRangeId: string | null;
}

export const PRICE_RANGES: PriceRange[] = [
	{ id: 'range-under-100', label: 'Hasta $99.900', min: 0, max: 99900 },
	{ id: 'range-100-149', label: '$100.000 - $149.900', min: 100000, max: 149900 },
	{ id: 'range-150-199', label: '$150.000 - $199.900', min: 150000, max: 199900 },
	{ id: 'range-200-249', label: '$200.000 - $249.900', min: 200000, max: 249900 },
	{ id: 'range-250-plus', label: 'Desde $250.000', min: 250000, max: null }
];

export const DEFAULT_FILTERS: ProductFiltersState = {
	category: 'Todos',
	brands: [],
	scentFamilies: [],
	priceRangeId: null
};

const createDefaultFilters = (): ProductFiltersState => ({
	category: 'Todos',
	brands: [],
	scentFamilies: [],
	priceRangeId: null
});

interface ProductFiltersProps {
	value?: ProductFiltersState;
	onChange?: (next: ProductFiltersState) => void;
}

export default function ProductFilters({ value, onChange }: ProductFiltersProps) {
	const resolvedValue = value ?? createDefaultFilters();
	const emitChange = onChange ?? (() => undefined);

	const [isOpen, setIsOpen] = useState(false);

	const activeFilters = useMemo(() => {
		const chips: string[] = [];

		if (resolvedValue.category !== 'Todos') {
			chips.push(resolvedValue.category);
		}

		if (resolvedValue.brands.length > 0) {
			chips.push(...resolvedValue.brands.map((brand) => `Marca: ${brand}`));
		}

		if (resolvedValue.scentFamilies.length > 0) {
			chips.push(...resolvedValue.scentFamilies.map((family) => `Familia: ${family}`));
		}

		if (resolvedValue.priceRangeId) {
			const range = PRICE_RANGES.find((item) => item.id === resolvedValue.priceRangeId);
			if (range) chips.push(range.label);
		}

		return chips;
	}, [resolvedValue]);

	const updateFilters = (partial: Partial<ProductFiltersState>) => {
		emitChange({ ...resolvedValue, ...partial });
	};

	const toggleBrand = (brand: string) => {
		const exists = resolvedValue.brands.includes(brand);
		const updated = exists
			? resolvedValue.brands.filter((item) => item !== brand)
			: [...resolvedValue.brands, brand];

		updateFilters({ brands: updated });
	};

	const toggleFamily = (family: string) => {
		const exists = resolvedValue.scentFamilies.includes(family);
		const updated = exists
			? resolvedValue.scentFamilies.filter((item) => item !== family)
			: [...resolvedValue.scentFamilies, family];

		updateFilters({ scentFamilies: updated });
	};

	const clearFilters = () => {
		emitChange(createDefaultFilters());
	};

	const filtersCard = (
		<FilterContent
			value={resolvedValue}
			onCategoryChange={(category) => updateFilters({ category })}
			onToggleBrand={toggleBrand}
			onToggleFamily={toggleFamily}
			onPriceChange={(priceRangeId) => updateFilters({ priceRangeId })}
			onClear={clearFilters}
		/>
	);

	return (
		<>
			<div className="mb-6 flex flex-col gap-3 lg:hidden">
				<Button
					onClick={() => setIsOpen(true)}
					className="w-full rounded-2xl border border-gold/40 bg-gold/10 text-gold-soft shadow-sm transition hover:bg-gold hover:text-black"
				>
					<Filter className="mr-2 h-4 w-4" />
					Filtros y orden
				</Button>

				{activeFilters.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{activeFilters.map((chip) => (
							<span
								key={chip}
								className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs text-gold-soft"
							>
								{chip}
							</span>
						))}
						<button
							onClick={clearFilters}
							className="text-xs text-gray-400 underline-offset-2 hover:text-gold-soft hover:underline"
						>
							Limpiar
						</button>
					</div>
				)}
			</div>

			<aside className="hidden lg:block">
				<div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
					{filtersCard}
				</div>
			</aside>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex lg:hidden">
					<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
					<div className="relative ml-auto flex h-full w-full max-w-sm flex-col gap-6 overflow-y-auto border-l border-white/10 bg-black px-6 py-8 shadow-2xl">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs uppercase tracking-[0.3em] text-gold-soft">Catálogo</p>
								<h2 className="text-2xl font-serif text-white">Refinar búsqueda</h2>
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setIsOpen(false)}
								className="rounded-full border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
							>
								<X className="h-5 w-5" />
							</Button>
						</div>

						<div className="grid gap-6">
							{filtersCard}
							<Button
								onClick={() => setIsOpen(false)}
								className="mt-2 w-full rounded-2xl bg-gold text-black hover:bg-gold-light"
							>
								Aplicar filtros
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

interface FilterContentProps {
	value: ProductFiltersState;
	onCategoryChange: (category: string) => void;
	onToggleBrand: (brand: string) => void;
	onToggleFamily: (family: string) => void;
	onPriceChange: (priceId: string | null) => void;
	onClear: () => void;
}

function FilterContent({ value, onCategoryChange, onToggleBrand, onToggleFamily, onPriceChange, onClear }: FilterContentProps) {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-400">
					<SlidersHorizontal className="h-4 w-4" />
					Filtros activos
				</div>
				<button
					onClick={onClear}
					className="text-xs font-semibold text-gray-400 underline-offset-2 transition hover:text-gold-soft hover:underline"
				>
					Limpiar todo
				</button>
			</div>

			<section className="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p className="text-xs uppercase tracking-[0.25em] text-gold-soft">Categoría</p>
				<div className="mt-3 grid gap-2">
					{CATEGORY_OPTIONS.map((category) => {
						const active = value.category === category;
						return (
							<button
								key={category}
								type="button"
								onClick={() => onCategoryChange(category)}
								className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
									active
										? 'border-gold/40 bg-gold/15 text-gold'
										: 'border-transparent bg-white/5 text-gray-300 hover:border-gold/20 hover:bg-gold/5 hover:text-white'
								}`}
							>
								<span>{category}</span>
								{active && <span className="text-xs text-gold/80">Activo</span>}
							</button>
						);
					})}
				</div>
			</section>

			<section className="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p className="text-xs uppercase tracking-[0.25em] text-gold-soft">Precio</p>
				<div className="mt-3 grid gap-2">
					{PRICE_RANGES.map((range) => {
						const active = value.priceRangeId === range.id;
						return (
							<button
								key={range.id}
								type="button"
								onClick={() => onPriceChange(active ? null : range.id)}
								className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
									active
										? 'border-gold/40 bg-gold/15 text-gold'
										: 'border-transparent bg-white/5 text-gray-300 hover:border-gold/20 hover:bg-gold/5 hover:text-white'
								}`}
							>
								<span>{range.label}</span>
								{active && <span className="text-xs text-gold/80">Activo</span>}
							</button>
						);
					})}
				</div>
			</section>

			<section className="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p className="text-xs uppercase tracking-[0.25em] text-gold-soft">Familia olfativa</p>
				<div className="mt-3 flex flex-wrap gap-2">
					{SCENT_FAMILY_OPTIONS.map((family) => {
						const active = value.scentFamilies.includes(family);
						return (
							<button
								key={family}
								type="button"
								onClick={() => onToggleFamily(family)}
								className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
									active
										? 'border-gold/40 bg-gold/20 text-gold'
										: 'border-white/10 bg-white/5 text-gray-300 hover:border-gold/20 hover:bg-gold/5 hover:text-white'
								}`}
							>
								{family}
							</button>
						);
					})}
				</div>
			</section>

			<section className="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p className="text-xs uppercase tracking-[0.25em] text-gold-soft">Inspiración</p>
				<div className="mt-3 flex flex-col gap-2">
					{BRAND_OPTIONS.map((brand) => {
						const active = value.brands.includes(brand);
						return (
							<button
								key={brand}
								type="button"
								onClick={() => onToggleBrand(brand)}
								className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
									active
										? 'border-gold/40 bg-gold/15 text-gold'
										: 'border-transparent bg-white/5 text-gray-300 hover:border-gold/20 hover:bg-gold/5 hover:text-white'
								}`}
							>
								<span>{brand}</span>
								{active && <span className="text-xs text-gold/80">Activo</span>}
							</button>
						);
					})}
				</div>
			</section>
		</div>
	);
}