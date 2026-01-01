export interface BookingConfirmationData {
  customerName: string
  bookingRef: string
  vehicleName: string
  vehicleImage: string
  pickupDate: string
  dropoffDate: string
  pickupLocation: string
  totalPrice: string
  currency: string
}

export const bookingConfirmationTemplate = (data: BookingConfirmationData) => {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rezervasyon Onayı</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: var(--lydian-bg-surface);">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: var(--lydian-bg-surface); padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: var(--lydian-text-inverse); border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, var(--lydian-info) 0%, var(--lydian-info-hover) 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
              <h1 style="margin: 0; color: var(--lydian-text-inverse); font-size: 28px; font-weight: bold;">Rezervasyonunuz Onaylandı!</h1>
              <p style="margin: 10px 0 0 0; color: var(--lydian-info-light); font-size: 14px;">Rezervasyon No: ${data.bookingRef}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; color: var(--lydian-text-secondary); font-size: 16px;">
                Merhaba ${data.customerName},
              </p>

              <p style="margin: 0 0 30px 0; color: var(--lydian-text-secondary); font-size: 16px; line-height: 1.6;">
                Araç kiralama rezervasyonunuz başarıyla tamamlandı. Rezervasyon detaylarınız aşağıdadır:
              </p>

              <!-- Vehicle Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: var(--lydian-bg-surface); border-radius: 8px; overflow: hidden; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="120" style="padding-right: 20px;">
                          <img src="${data.vehicleImage}" alt="${data.vehicleName}" style="width: 100px; height: 75px; border-radius: 6px; object-fit: cover;" />
                        </td>
                        <td>
                          <h3 style="margin: 0 0 5px 0; color: var(--lydian-text); font-size: 18px;">${data.vehicleName}</h3>
                          <p style="margin: 0; color: var(--lydian-text-tertiary); font-size: 14px;">${data.currency} ${data.totalPrice}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Booking Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid var(--lydian-border);">
                    <table width="100%">
                      <tr>
                        <td style="color: var(--lydian-text-tertiary); font-size: 14px; width: 150px;">Alış Tarihi:</td>
                        <td style="color: var(--lydian-text); font-size: 14px; font-weight: 600;">${data.pickupDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid var(--lydian-border);">
                    <table width="100%">
                      <tr>
                        <td style="color: var(--lydian-text-tertiary); font-size: 14px; width: 150px;">İade Tarihi:</td>
                        <td style="color: var(--lydian-text); font-size: 14px; font-weight: 600;">${data.dropoffDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid var(--lydian-border);">
                    <table width="100%">
                      <tr>
                        <td style="color: var(--lydian-text-tertiary); font-size: 14px; width: 150px;">Alış Lokasyonu:</td>
                        <td style="color: var(--lydian-text); font-size: 14px; font-weight: 600;">${data.pickupLocation}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <table width="100%">
                      <tr>
                        <td style="color: var(--lydian-text-tertiary); font-size: 14px; width: 150px;">Toplam Tutar:</td>
                        <td style="color: var(--lydian-success-hover); font-size: 18px; font-weight: bold;">${data.currency} ${data.totalPrice}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Important Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: var(--lydian-warning-light); border-left: 4px solid var(--lydian-warning); padding: 16px; border-radius: 6px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 10px 0; color: #92400e; font-size: 14px; font-weight: 600;">⚠️ Önemli Bilgiler</p>
                    <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 13px; line-height: 1.6;">
                      <li>Lütfen aracı teslim alırken kimliğinizi ve sürücü belgenizi yanınızda bulundurun.</li>
                      <li>Araç teslimi sırasında hasar kontrolü yapılacaktır.</li>
                      <li>İptal koşulları için sözleşmenizi kontrol edin.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="https://holiday.ailydian.com/bookings/${data.bookingRef}" style="display: inline-block; background-color: var(--lydian-info); color: var(--lydian-text-inverse); text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                            Rezervasyonu Görüntüle
                          </a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="https://holiday.ailydian.com/support" style="display: inline-block; background-color: var(--lydian-text-inverse); color: var(--lydian-text-secondary); text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; font-weight: 600; border: 1px solid var(--lydian-text-dim);">
                            Destek Al
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: var(--lydian-bg-surface); padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 10px 0; color: var(--lydian-text-tertiary); font-size: 14px;">
                İyi yolculuklar dileriz! 🚗💨
              </p>
              <p style="margin: 0; color: var(--lydian-text-muted); font-size: 12px;">
                © 2025 Travel LyDian. Tüm hakları saklıdır.
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
