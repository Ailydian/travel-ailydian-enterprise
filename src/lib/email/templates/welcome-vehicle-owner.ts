export const welcomeVehicleOwnerTemplate = (name: string, companyName: string) => {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hoş Geldiniz - Travel LyDian</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: var(--lydian-bg-surface);">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: var(--lydian-bg-surface); padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: var(--lydian-text-inverse); border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, var(--lydian-success) 0%, var(--lydian-success-hover) 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: var(--lydian-text-inverse); font-size: 32px; font-weight: bold;">🚗 Travel LyDian</h1>
              <p style="margin: 10px 0 0 0; color: var(--lydian-success-light); font-size: 16px;">Araç Kiralama Platformu</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: var(--lydian-text); font-size: 24px;">Hoş Geldiniz, ${name}! 👋</h2>

              <p style="margin: 0 0 16px 0; color: var(--lydian-text-secondary); font-size: 16px; line-height: 1.6;">
                <strong>${companyName}</strong> olarak Travel LyDian ailesine katıldığınız için teşekkür ederiz!
              </p>

              <p style="margin: 0 0 16px 0; color: var(--lydian-text-secondary); font-size: 16px; line-height: 1.6;">
                Artık binlerce potansiyel müşteriye araçlarınızı sunabilir ve gelirinizi artırabilirsiniz.
              </p>

              <!-- Stats Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #f0fdf4; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="text-align: center; padding: 10px;">
                    <div style="font-size: 28px; font-weight: bold; color: var(--lydian-success-hover);">2,000+</div>
                    <div style="font-size: 14px; color: #065f46; margin-top: 5px;">Araç Sahibi</div>
                  </td>
                  <td style="text-align: center; padding: 10px;">
                    <div style="font-size: 28px; font-weight: bold; color: var(--lydian-success-hover);">₺8,500</div>
                    <div style="font-size: 14px; color: #065f46; margin-top: 5px;">Ortalama Aylık Gelir</div>
                  </td>
                  <td style="text-align: center; padding: 10px;">
                    <div style="font-size: 28px; font-weight: bold; color: var(--lydian-success-hover);">%97</div>
                    <div style="font-size: 14px; color: #065f46; margin-top: 5px;">Memnuniyet</div>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <h3 style="margin: 30px 0 15px 0; color: var(--lydian-text); font-size: 18px;">İlk Adımlar 🚀</h3>

              <ol style="margin: 0; padding-left: 20px; color: var(--lydian-text-secondary); font-size: 15px; line-height: 1.8;">
                <li>Dashboard'unuza giriş yapın</li>
                <li>İlk aracınızı ekleyin (sadece 8 adım!)</li>
                <li>Fiyatlandırmanızı ayarlayın</li>
                <li>İlk rezervasyonunuzu alın</li>
              </ol>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://holiday.ailydian.com/vehicle-owner" style="display: inline-block; background: linear-gradient(135deg, var(--lydian-success) 0%, var(--lydian-success-hover) 100%); color: var(--lydian-text-inverse); text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                      Dashboard'a Git →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; color: var(--lydian-text-tertiary); font-size: 14px; line-height: 1.6;">
                Herhangi bir sorunuz varsa, 7/24 destek ekibimiz size yardımcı olmaktan mutluluk duyar.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: var(--lydian-bg-surface); padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 10px 0; color: var(--lydian-text-tertiary); font-size: 14px;">
                © 2025 Travel LyDian. Tüm hakları saklıdır.
              </p>
              <p style="margin: 0; color: var(--lydian-text-muted); font-size: 12px;">
                Bu e-posta size Travel LyDian hesabınız için gönderilmiştir.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
