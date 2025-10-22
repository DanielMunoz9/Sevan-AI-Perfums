# 🔧 GUÍA CONFIGURACIÓN EMAILJS - TEMPLATES SEVAN

## 📧 **ACCESO AL DASHBOARD**
1. Ir a: https://dashboard.emailjs.com/
2. Login con: sevan7625@gmail.com
3. Seleccionar Service: `service_9vua9zf`

---

## 🎯 **TEMPLATE 1: NOTIFICACIONES**

### ➡️ **Pasos:**
1. Click en **"Email Templates"**
2. Click **"Create New Template"**
3. **Template ID:** `template_notifications`
4. **Template Name:** `SEVAN - Notificaciones`

### 📝 **CONFIGURACIÓN:**

**Subject:** `{{subject}}`

**HTML Content:** 
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #1a1a1a, #2d2d2d);">
    
    <div style="max-width: 600px; margin: 20px auto; background: #000000; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3); border: 2px solid #d4af37;">
        
        <!-- Header con Logo SEVAN -->
        <div style="background: linear-gradient(135deg, #000000, #1a1a1a); padding: 40px 30px; text-align: center; position: relative;">
            <!-- Logo SEVAN Estilizado -->
            <div style="display: inline-block; background: linear-gradient(135deg, #d4af37, #b8941f); padding: 20px 40px; border-radius: 12px; box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4); margin-bottom: 20px;">
                <h1 style="margin: 0; color: #000000; font-size: 32px; font-weight: 900; letter-spacing: 4px; text-shadow: none;">
                    SEVAN
                </h1>
            </div>
            
            <p style="margin: 15px 0 0 0; color: #d4af37; font-size: 16px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
                Perfumes Exclusivos
            </p>
            
            <!-- Decoración dorada -->
            <div style="width: 80px; height: 2px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin: 20px auto 0;"></div>
        </div>
        
        <!-- Contenido Principal -->
        <div style="padding: 40px 30px; background: #ffffff;">
            
            <!-- Información del Mensaje -->
            <div style="background: linear-gradient(135deg, #f8f9fa, #ffffff); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #d4af37; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <table style="width: 100%; font-size: 14px; color: #333333;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #000000;">Para:</td>
                        <td style="padding: 8px 0; color: #555555;">{{to_email}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #000000;">De:</td>
                        <td style="padding: 8px 0; color: #555555;">{{from_name}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #000000;">Asunto:</td>
                        <td style="padding: 8px 0; color: #d4af37; font-weight: 600;">{{subject}}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Mensaje Principal -->
            <div style="background: #ffffff; padding: 30px; border: 2px solid #f0f0f0; border-radius: 12px; margin-bottom: 30px;">
                <div style="font-size: 16px; line-height: 1.8; color: #333333;">
                    {{message}}
                </div>
            </div>
            
            <!-- Botón de Acción (si existe) -->
            {{#action_url}}
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{action_url}}" style="display: inline-block; background: linear-gradient(135deg, #d4af37, #b8941f); color: #000000; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3); transition: all 0.3s ease;">
                    {{action_text}}
                </a>
            </div>
            {{/action_url}}
        </div>
        
        <!-- Footer Elegante -->
        <div style="background: linear-gradient(135deg, #1a1a1a, #000000); padding: 30px; text-align: center;">
            <!-- Logo pequeño -->
            <div style="display: inline-block; background: #d4af37; padding: 10px 20px; border-radius: 6px; margin-bottom: 20px;">
                <span style="color: #000000; font-weight: 900; font-size: 14px; letter-spacing: 2px;">SEVAN</span>
            </div>
            
            <p style="margin: 0 0 15px 0; color: #d4af37; font-size: 14px; font-weight: 600;">
                Perfumes Exclusivos • Elegancia Premium • Experiencia Única
            </p>
            
            <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 14px;">
                    <strong style="color: #d4af37;">📧 Contacto:</strong> sevan7625@gmail.com
                </p>
                <p style="margin: 0; color: #ffffff; font-size: 14px;">
                    <strong style="color: #d4af37;">🌐 Web:</strong> 
                    <a href="#" style="color: #d4af37; text-decoration: none;">www.sevanperfumes.com</a>
                </p>
            </div>
            
            <div style="padding-top: 20px; border-top: 1px solid #333333;">
                <p style="margin: 0; color: #888888; font-size: 12px; line-height: 1.5;">
                    Este correo fue enviado desde el sistema de notificaciones SEVAN Perfumes.<br>
                    Si no solicitaste esta notificación, puedes ignorarla de forma segura.
                </p>
                <p style="margin: 10px 0 0 0; color: #666666; font-size: 11px;">
                    © 2024 SEVAN Perfumes. Todos los derechos reservados.
                </p>
            </div>
        </div>
    </div>
    
</body>
</html>
```

**Settings:**
- **To Email:** `{{to_email}}`
- **From Name:** `SEVAN Perfumes`
- **From Email:** `sevan7625@gmail.com`
- **Reply To:** `sevan7625@gmail.com`

---

## 🔒 **TEMPLATE 2: RECUPERACIÓN DE CONTRASEÑA**

### ➡️ **Pasos:**
1. Click **"Create New Template"** (otro template)
2. **Template ID:** `template_password_recovery`
3. **Template Name:** `SEVAN - Recuperación de Contraseña`

### 📝 **CONFIGURACIÓN:**

**Subject:** `{{subject}}`

**HTML Content:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #1a1a1a, #2d2d2d);">
    
    <div style="max-width: 600px; margin: 20px auto; background: #000000; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3); border: 2px solid #d4af37;">
        
        <!-- Header de Seguridad -->
        <div style="background: linear-gradient(135deg, #000000, #1a1a1a); padding: 40px 30px; text-align: center; position: relative;">
            
            <!-- Logo SEVAN con escudo -->
            <div style="display: inline-block; background: linear-gradient(135deg, #d4af37, #b8941f); padding: 20px 40px; border-radius: 12px; box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4); margin-bottom: 20px; position: relative;">
                <h1 style="margin: 0; color: #000000; font-size: 30px; font-weight: 900; letter-spacing: 4px;">
                    🛡️ SEVAN
                </h1>
            </div>
            
            <h2 style="margin: 20px 0 10px 0; color: #d4af37; font-size: 20px; font-weight: 700; letter-spacing: 2px;">
                RECUPERACIÓN DE CONTRASEÑA
            </h2>
            
            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; font-weight: 500;">
                Solicitud de restablecimiento de acceso
            </p>
            
            <!-- Decoración -->
            <div style="width: 100px; height: 2px; background: linear-gradient(90deg, transparent, #d4af37, transparent); margin: 20px auto 0;"></div>
        </div>
        
        <!-- Contenido Principal -->
        <div style="padding: 40px 30px; background: #ffffff;">
            
            <!-- Mensaje de Seguridad -->
            <div style="background: linear-gradient(135deg, #fff9e6, #ffffff); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #d4af37; text-align: center;">
                <h3 style="margin: 0 0 15px 0; color: #000000; font-size: 18px; font-weight: 700;">
                    Hola {{user_name}},
                </h3>
                <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.6;">
                    Recibimos una solicitud para restablecer la contraseña de tu cuenta SEVAN Perfumes.
                </p>
            </div>
            
            <!-- Token de Recuperación -->
            <div style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); padding: 30px; border-radius: 15px; margin: 30px 0; text-align: center; border: 3px solid #d4af37; position: relative;">
                
                <!-- Etiqueta de seguridad -->
                <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #d4af37; padding: 8px 20px; border-radius: 20px;">
                    <span style="color: #000000; font-size: 12px; font-weight: bold;">🔒 CÓDIGO SEGURO</span>
                </div>
                
                <h4 style="margin: 0 0 20px 0; color: #d4af37; font-size: 16px; font-weight: 700;">
                    TU CÓDIGO DE RECUPERACIÓN
                </h4>
                
                <!-- Código del token -->
                <div style="background: #ffffff; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px dashed #d4af37;">
                    <span style="font-family: 'Courier New', monospace; font-size: 28px; font-weight: 900; color: #000000; letter-spacing: 3px;">
                        {{reset_token}}
                    </span>
                </div>
                
                <p style="margin: 15px 0 0 0; color: #ffffff; font-size: 14px; line-height: 1.5;">
                    Copia este código y úsalo para restablecer tu contraseña<br>
                    <strong style="color: #d4af37;">Válido por 15 minutos</strong>
                </p>
            </div>
            
            <!-- Botón de Acción Principal -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="{{reset_url}}" style="display: inline-block; background: linear-gradient(135deg, #d4af37, #b8941f); color: #000000; padding: 18px 40px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4); border: 2px solid #d4af37;">
                    🔓 RESTABLECER CONTRASEÑA
                </a>
            </div>
            
            <!-- Instrucciones de Seguridad -->
            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 30px 0; border: 1px solid #e0e0e0;">
                <h4 style="margin: 0 0 15px 0; color: #000000; font-size: 16px; font-weight: 700;">
                    🛡️ INSTRUCCIONES DE SEGURIDAD:
                </h4>
                <ul style="margin: 0; padding-left: 20px; color: #555555; font-size: 14px; line-height: 1.6;">
                    <li><strong>Usa el código de arriba</strong> en la página de recuperación</li>
                    <li><strong>El código expira en 15 minutos</strong> por seguridad</li>
                    <li><strong>Si no solicitaste esto,</strong> ignora este correo</li>
                    <li><strong>Tu contraseña actual</strong> sigue siendo válida hasta que la cambies</li>
                </ul>
            </div>
            
            <!-- Información Adicional -->
            <div style="background: linear-gradient(135deg, #fff0f0, #ffffff); padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ff6b6b;">
                <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                    <strong style="color: #ff6b6b;">⚠️ ¿No fuiste tú?</strong><br>
                    Si no solicitaste este restablecimiento, tu cuenta podría estar en riesgo. 
                    Contáctanos inmediatamente a <strong>sevan7625@gmail.com</strong>
                </p>
            </div>
        </div>
        
        <!-- Footer de Seguridad -->
        <div style="background: linear-gradient(135deg, #1a1a1a, #000000); padding: 35px 30px; text-align: center;">
            
            <!-- Logo y seguridad -->
            <div style="margin-bottom: 25px;">
                <div style="display: inline-block; background: #d4af37; padding: 12px 25px; border-radius: 8px; margin-bottom: 15px;">
                    <span style="color: #000000; font-weight: 900; font-size: 16px; letter-spacing: 3px;">SEVAN</span>
                </div>
                <p style="margin: 0; color: #d4af37; font-size: 14px; font-weight: 600;">
                    Tu Seguridad es Nuestra Prioridad
                </p>
            </div>
            
            <div style="padding-top: 20px; border-top: 1px solid #333333;">
                <p style="margin: 0; color: #888888; font-size: 12px; line-height: 1.5;">
                    Este es un correo automatizado del sistema de seguridad SEVAN Perfumes.<br>
                    Por favor, no respondas a este correo. Para soporte contacta: sevan7625@gmail.com
                </p>
                <p style="margin: 15px 0 0 0; color: #666666; font-size: 11px;">
                    © 2024 SEVAN Perfumes. Protegemos tu información.
                </p>
            </div>
        </div>
    </div>
    
</body>
</html>
```

**Settings:**
- **To Email:** `{{to_email}}`
- **From Name:** `SEVAN Security`
- **From Email:** `sevan7625@gmail.com`
- **Reply To:** `sevan7625@gmail.com`

---

## ✅ **DESPUÉS DE CREAR LOS TEMPLATES:**

1. **Copiar los Template IDs** que genera EmailJS
2. **Actualizar el código con los IDs reales**
3. **Hacer pruebas de envío**

---

## 🎯 **VARIABLES IMPORTANTES:**

### Template Notificaciones:
- `{{to_email}}`, `{{from_name}}`, `{{subject}}`, `{{message}}`, `{{action_url}}`, `{{action_text}}`

### Template Recovery:
- `{{to_email}}`, `{{subject}}`, `{{user_name}}`, `{{reset_token}}`, `{{reset_url}}`

---

## 🚨 **SIGUIENTE PASO:**
Una vez creados los templates, necesitamos actualizar el código con los **Template IDs reales** que genera EmailJS.