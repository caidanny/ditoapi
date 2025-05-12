const mailTempalte = (date, time, stadium, players, hotImgUrls = []) => {
    if (!stadium) { stadium = 'DUY TÂN' }
    var hotImg = '';
    if(hotImgUrls) {
        if (hotImgUrls.length > 0) {
                hotImgUrls.forEach(url => {
                    hotImg = hotImg + '<img style="text-align: center" src="' + url + '"><br>'
                })
            }
    }
    var pA = '', pB = '', pC = '';
    var totalC = (parseInt(players.plyC.length)> 0) ? parseInt(players.plyC.length) : 0;
    var total = parseInt(players.plyA.length) + parseInt(players.plyB.length) + totalC;

    players.plyA.forEach(p => {
        pA = pA + '<tr style="border : 0.5pt solid white; background-color: #e74a3b; text-align: center; color: white; font-family: Arial, Helvetica, sans-serif">' +
            '                    <td style="width: 100%;">' + p + '</td>' +
            '                </tr>'
    })

    players.plyB.forEach(p => {
        pB = pB + '<tr style="border : 0.5pt solid white; background-color: #1cc88a; text-align: center; color: white; font-family: Arial, Helvetica, sans-serif">' +
            '                    <td style="width: 100%;">' + p + '</td>' +
            '                </tr>'
    })

    players.plyC.forEach(p => {
        pC = pC + '<tr style="border : 0.5pt solid white; background-color: #4e73df; text-align: center; color: white; font-family: Arial, Helvetica, sans-serif">' +
            '                    <td style="width: 100%;">' + p + '</td>' +
            '                </tr>'
    })

    cTemp = "";
    cTempTb = "";
    size = 50;
    if(players.plyC.length > 0)
    {
        size = 33;
        cTemp =
        '        <td style="width: 33%; background-color: #4e73df; text-align: center; color: white; font-family: Arial, Helvetica, sans-serif; font-weight: bold">' +
        '            Team C (' + players.plyC.length + ')' +
        '        </td>'
        cTempTb =         '<td>' +
        '            <table style="width: 100%;">' + pC +
        '            </table>' +
        '        </td>'
    }


    screenShotUrl = '<table style="width: 80%; margin-left: auto; margin-right: auto;">' +
        '<tr><td colspan="2" style="width: 100%; text-align: center; font-family: Arial, Helvetica, sans-serif; font-weight: bold">TOTAL: ' + total + '</td></tr>' +
        '    <tr>' +
        '        <td style="width: ' + size + '%; background-color: #e74a3b; text-align: center; color: white; font-family: Arial, Helvetica, sans-serif; font-weight: bold">' +
        '            Team A (' + players.plyA.length + ')' +
        '        </td>' +
        '        <td style="width: ' + size + '%; background-color: #1cc88a; text-align: center; color: white; font-family: Arial, Helvetica, sans-serif; font-weight: bold">' +
        '            Team B (' + players.plyB.length + ')' +
        '        </td>' + cTemp +
        '    </tr>' +
        '    <tr>' +
        '        <td>' +
        '            <table style="width: 100%;">' + pA +
        '            </table>' +
        '        </td>' +
        '        <td>' +
        '            <table style="width: 100%;">' + pB +
        '            </table>' +
        '        </td>' + cTempTb +
        '    </tr>' +
        '</table>';


    return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
        '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
        '' +
        '<head>' +
        '	<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->' +
        '	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
        '	<meta name="viewport" content="width=device-width">' +
        '	<!--[if !mso]><!-->' +
        '	<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
        '	<!--<![endif]-->' +
        '	<title></title>' +
        '	<!--[if !mso]><!-->' +
        '	<!--<![endif]-->' +
        '	<style type="text/css">' +
        '		body {' +
        '			margin: 0;' +
        '			padding: 0;' +
        '		}' +
        '' +
        '		table,' +
        '		td,' +
        '		tr {' +
        '			vertical-align: top;' +
        '			border-collapse: collapse;' +
        '		}' +
        '' +
        '		* {' +
        '			line-height: inherit;' +
        '		}' +
        '' +
        '		a[x-apple-data-detectors=true] {' +
        '			color: inherit !important;' +
        '			text-decoration: none !important;' +
        '		}' +
        '	</style>' +
        '	<style type="text/css" id="media-query">' +
        '		@media (max-width: 520px) {' +
        '' +
        '			.block-grid,' +
        '			.col {' +
        '				min-width: 320px !important;' +
        '				max-width: 100% !important;' +
        '				display: block !important;' +
        '			}' +
        '' +
        '			.block-grid {' +
        '				width: 100% !important;' +
        '			}' +
        '' +
        '			.col {' +
        '				width: 100% !important;' +
        '			}' +
        '' +
        '			.col>div {' +
        '				margin: 0 auto;' +
        '			}' +
        '' +
        '			img.fullwidth,' +
        '			img.fullwidthOnMobile {' +
        '				max-width: 100% !important;' +
        '			}' +
        '' +
        '			.no-stack .col {' +
        '				min-width: 0 !important;' +
        '				display: table-cell !important;' +
        '			}' +
        '' +
        '			.no-stack.two-up .col {' +
        '				width: 50% !important;' +
        '			}' +
        '' +
        '			.no-stack .col.num4 {' +
        '				width: 33% !important;' +
        '			}' +
        '' +
        '			.no-stack .col.num8 {' +
        '				width: 66% !important;' +
        '			}' +
        '' +
        '			.no-stack .col.num4 {' +
        '				width: 33% !important;' +
        '			}' +
        '' +
        '			.no-stack .col.num3 {' +
        '				width: 25% !important;' +
        '			}' +
        '' +
        '			.no-stack .col.num6 {' +
        '				width: 50% !important;' +
        '			}' +
        '' +
        '			.no-stack .col.num9 {' +
        '				width: 75% !important;' +
        '			}' +
        '' +
        '			.video-block {' +
        '				max-width: none !important;' +
        '			}' +
        '' +
        '			.mobile_hide {' +
        '				min-height: 0px;' +
        '				max-height: 0px;' +
        '				max-width: 0px;' +
        '				display: none;' +
        '				overflow: hidden;' +
        '				font-size: 0px;' +
        '			}' +
        '' +
        '			.desktop_hide {' +
        '				display: block !important;' +
        '				max-height: none !important;' +
        '			}' +
        '		}' +
        '	</style>' +
        '</head>' +
        '' +
        '<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">' +
        '	<!--[if IE]><div class="ie-browser"><![endif]-->' +
        '	<table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#FFFFFF" valign="top">' +
        '		<tbody>' +
        '			<tr style="vertical-align: top;" valign="top">' +
        '				<td style="word-break: break-word; vertical-align: top;" valign="top">' +
        '					<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->' +
        '					<div style="background-color:transparent;">' +
        '						<div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">' +
        '							<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">' +
        '								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->' +
        '								<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->' +
        '								<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">' +
        '									<div style="width:100% !important;">' +
        '										<!--[if (!mso)&(!IE)]><!-->' +
        '										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">' +
        '											<!--<![endif]-->' +
        '											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->' +
        '											<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">' +
        '												<div style="line-height: 1.2; font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 14px;">' +
        '													<p style="font-size: 16px; line-height: 1.2; text-align: center; word-break: break-word; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 19px; margin: 0;"><span style="color: #333399; font-size: 16px;"><strong>MƯA THÌ LÊN FACEBOOK CHECK. ĐỀ NGHỊ AE ĐI ĐÔNG ĐỦ, TRÁNH TÌNH TRẠNG THIẾU NGƯỜI.</strong></span></p>' +
        '												</div>' +
        '											</div>' +
        '											<!--[if mso]></td></tr></table><![endif]-->' +
        '											<!--[if (!mso)&(!IE)]><!-->' +
        '										</div>' +
        '										<!--<![endif]-->' +
        '									</div>' +
        '								</div>' +
        '								<!--[if (mso)|(IE)]></td></tr></table><![endif]-->' +
        '								<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->' +
        '							</div>' +
        '						</div>' +
        '					</div>' +
        '					<div style="background-color:transparent;">' +
        '						<div class="block-grid " style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">' +
        '							<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">' +
        '								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->' +
        '								<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->' +
        '								<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">' +
        '									<div style="width:100% !important;">' +
        '										<!--[if (!mso)&(!IE)]><!-->' +
        '										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">' +
        '											<!--<![endif]-->' +
        '											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->' +
        '											<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">' +
        '												<div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">' +
        '													<p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"><span style="color: #ff0000;"><strong><span style="font-size: 18px;">THÔNG BÁO</span></strong></span></p>' +
        '												</div>' +
        '											</div>' +
        '											<!--[if mso]></td></tr></table><![endif]-->' +
        '											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->' +
        '											<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">' +
        '												<div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">' +
        '													<p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"><span style="color: #ff0000;"><strong><span style="font-size: 18px; color: #333399;">Vào lúc </span><span style="font-size: 18px;"><span style="font-size: 24px;">' + time + '</span><span style="font-size: 18px;"> <br><span style="color: #333399;"> ' + date + '</span></span></span></strong></span></p>' +
        '													<p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"><span style="color: #ff0000;"><strong><span style="font-size: 18px;"><span style="color: #333399;">Sân:</span> ' + stadium + '</span></strong></span></p>' +
        '												</div>' +
        '											</div>' +
        '											<!--[if mso]></td></tr></table><![endif]-->' +
        '											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->' +
        '											<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">' +
        '												<div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">' +
        '													<p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"><span style="color: #333399;"><span style="font-size: 18px;"><strong>DANH SÁCH THI ĐẤU</strong></span></span></p>' +
        '												</div>' +
        '											</div>' +
        '											<!--[if mso]></td></tr></table><![endif]-->' +
        '											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->' +
        '											<div style="text-align: center; color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">' +
        '												<div style="text-align: center; line-height: 1.2; font-size: 12px; color: #555555; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">' +
        '													' + screenShotUrl + '' +
        '												</div>' +
        '											</div>' +
        '											<!--[if mso]></td></tr></table><![endif]-->' +
        '											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->' +
        '											<div style="text-align: center; color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">' +
        '												<div  style="text-align: center, line-height: 1.2; font-size: 12px; color: #555555; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">' +
        '													<p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 14px; mso-line-height-alt: 17px; margin: 0;"><span style="color: #800080; font-size: 14px;"><strong>BONUS</strong></span></p>' +
        '													<p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"> </p>' +
        '													' + hotImg + '' +
        '												</div>' +
        '											</div>' +
        '											<!--[if mso]></td></tr></table><![endif]-->' +
        '											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->' +
        '											<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">' +
        '												<div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">' +
        '													<p style="line-height: 1.2; word-break: break-word; text-align: left; mso-line-height-alt: NaNpx; margin: 0;"><span style="color: #ff0000;"><strong><span style="font-size: 18px;">RULE:</span></strong></span></p>' +
        '													<ul>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Đi trễ <= 5 phút: 10K</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Đi trễ > 5 phút : 20K</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Đăng ký mà không đi: 30K</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Không đăng ký mà rúc đầu lên sân: 20K + đi trễ nếu có</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Ai được quay vào ô GK nếu đi trễ/không đi sẽ được phạt thêm 10k</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Điểm danh bằng hình thức reply mail, sẽ được mặc định làm GK</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Đăng ký mà không đi, trận đấu buộc phải hủy do thiếu người: 50k</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Điểm danh sau 22h (cùng ngày với email) sẽ không được chấp nhận</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Mọi lý do hủy đăng kí sau 19h (cùng ngày với email) sẽ không được chấp nhận</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">Ưu tiên member điểm danh trước, sau 7h tối nếu chưa đủ 18 thì có thể gọi cầu ngoài. Trong trường hợp trên 18 thì hỏi ý mn trong room</span></li>' +
        '														<li style="line-height: 1.2; word-break: break-word; text-align: left; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px;">QUỸ: Hạn cuối nộp quỹ: ngày 15 hàng tháng. Sau ngày 15, ai vẫn còn nợ quỹ thì sẽ bị phạt 50k</span></li>' +
        '													</ul>' +
        '												</div>' +
        '											</div>' +
        '											<!--[if mso]></td></tr></table><![endif]-->' +
        '											<!--[if (!mso)&(!IE)]><!-->' +
        '										</div>' +
        '										<!--<![endif]-->' +
        '									</div>' +
        '								</div>' +
        '								<!--[if (mso)|(IE)]></td></tr></table><![endif]-->' +
        '								<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->' +
        '							</div>' +
        '						</div>' +
        '					</div>' +
        '					<!--[if (mso)|(IE)]></td></tr></table><![endif]-->' +
        '				</td>' +
        '			</tr>' +
        '		</tbody>' +
        '	</table>' +
        '	<!--[if (IE)]></div><![endif]-->' +
        '</body>' +
        '' +
        '</html>';


}

module.exports = mailTempalte;
