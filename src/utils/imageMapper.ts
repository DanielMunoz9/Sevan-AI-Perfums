import catalogImageMap from '@/data/catalog-image-map.json';
import { default as WOMEN_PERFUME_IMAGES_MAP } from '@/data/women-perfume-images';
import { default as MEN_PERFUME_IMAGES_MAP } from '@/data/men-perfume-images';
import { getKitImagePath, getKitPlaceholderImage, isKitReference } from '@/utils/kitCatalog';

const FALLBACK_IMAGE = '/images/default-perfume.jpg';

const MAX_GALLERY_IMAGES = 2;

const PRODUCT_IMAGE_MAP: Record<string, string[]> = {
  'inspirado-en-caja-jean-pascal': ['/images/external/caja-1.png', '/images/external/caja-2.jpg'],
  'caja-jean-pascal': ['/images/external/caja-1.png', '/images/external/caja-2.jpg'],
  'inspirado-en-cuero-jean-pascal': ['/images/external/cuero-1.jpg', '/images/external/cuero-2.jpg'],
  'cuero-jean-pascal': ['/images/external/cuero-1.jpg', '/images/external/cuero-2.jpg'],
  'boss-bottled-hugo-boss': [
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-100ml-edp-11-premium-2483163.jpg?crop=center&height=720&v=1751884000&width=720',
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-100ml-edp-11-premium-4591083.png?crop=center&height=720&v=1751883999&width=720'
  ],
  'inspirado-en-boss-bottled-hugo-boss': [
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-100ml-edp-11-premium-2483163.jpg?crop=center&height=720&v=1751884000&width=720',
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-100ml-edp-11-premium-4591083.png?crop=center&height=720&v=1751883999&width=720'
  ],
  'boss-bottled-night-hugo-boss': [
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-night-100ml-edt-11-premium-7047199.png?crop=center&height=720&v=1751884148&width=720',
    'https://cdn.notinoimg.com/detail_main_hq/hugo-boss/737052352060_03/boss-bottled-night___250515.jpg'
  ],
  'inspirado-en-boss-bottled-night-hugo-boss': [
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-night-100ml-edt-11-premium-7047199.png?crop=center&height=720&v=1751884148&width=720',
    'https://cdn.notinoimg.com/detail_main_hq/hugo-boss/737052352060_03/boss-bottled-night___250515.jpg'
  ],
  'boss-bottled-unlimited-hugo-boss': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/12/Boss-Bottled-Unlimited-de-Hugo-Boss-para-Hombre-100ml-700x761.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Boss-Bottled-Unlimited-de-Hugo-Boss-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1'
  ],
  'inspirado-en-boss-bottled-unlimited-hugo-boss': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/12/Boss-Bottled-Unlimited-de-Hugo-Boss-para-Hombre-100ml-700x761.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Boss-Bottled-Unlimited-de-Hugo-Boss-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1'
  ],
  'dark-blue-hugo-boss': [
    'https://envioacasa.com.co/cdn/shop/files/Perfume_Hugo_Boss_Dark_Blue_EDT_envioacasa.co_envio_a_casa_2_0b44c3b7-05b2-4536-a265-54c9fbfa7bbe.jpg?v=1736182635&width=713',
    'https://aromatica.cr/cdn/shop/files/Decant-Hugo-Dark-Blue-para-hombre-Aromatica-CR-452989957.jpg?v=1751834677&width=600'
  ],
  'inspirado-en-dark-blue-hugo-boss': [
    'https://envioacasa.com.co/cdn/shop/files/Perfume_Hugo_Boss_Dark_Blue_EDT_envioacasa.co_envio_a_casa_2_0b44c3b7-05b2-4536-a265-54c9fbfa7bbe.jpg?v=1736182635&width=713',
    'https://aromatica.cr/cdn/shop/files/Decant-Hugo-Dark-Blue-para-hombre-Aromatica-CR-452989957.jpg?v=1751834677&width=600'
  ],
  'hugo-red-hugo-boss': [
    'https://farina.com.bo/wp-content/uploads/2020/04/hugo-boss-red-EDT-arte3.jpg',
    'https://www.fraganza.com.co/cdn/shop/products/20_hbeu58029708_999_21_7434a637-77c9-4be3-8a66-f0e3393e74e4_1024x1024@2x.jpg?v=1651439043'
  ],
  'inspirado-en-hugo-red-hugo-boss': [
    'https://farina.com.bo/wp-content/uploads/2020/04/hugo-boss-red-EDT-arte3.jpg',
    'https://www.fraganza.com.co/cdn/shop/products/20_hbeu58029708_999_21_7434a637-77c9-4be3-8a66-f0e3393e74e4_1024x1024@2x.jpg?v=1651439043'
  ],
  'in-motion-hugo-boss': [
    'https://www.zafiroperfumeria.com/wp-content/uploads/2024/02/Boss-in-Motion-Hugo-Boss.png',
    'https://qurumperfumes.com/uploads/media/2023/boss_in_motion_1.JPEG'
  ],
  'inspirado-en-in-motion-hugo-boss': [
    'https://www.zafiroperfumeria.com/wp-content/uploads/2024/02/Boss-in-Motion-Hugo-Boss.png',
    'https://qurumperfumes.com/uploads/media/2023/boss_in_motion_1.JPEG'
  ],
  '212-nyc-carolina-herrera': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/11/1581.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/212-Men-NYC-de-Carolina-Herrera-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1'
  ],
  '212-men-carolina-herrera': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/11/1581.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/212-Men-NYC-de-Carolina-Herrera-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1'
  ],
  // Women's version - Use female images
  'inspirado-en-212-nyc-carolina-herrera': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2021/09/15e2bce6a84d4a9b1a9a01bbc38183ba.212-NYC-carolina-herrera-acordes-1.jpg',
    'https://perfumescolombia.com.co/cdn/shop/products/212-nyc-carolina-herrera-11-premium-1920455.png?crop=center&height=720&v=1751884213&width=720'
  ],
  '212-nyc-carolina-herrera-mujer': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2021/09/15e2bce6a84d4a9b1a9a01bbc38183ba.212-NYC-carolina-herrera-acordes-1.jpg',
    'https://perfumescolombia.com.co/cdn/shop/products/212-nyc-carolina-herrera-11-premium-1920455.png?crop=center&height=720&v=1751884213&width=720'
  ],
  'inspirado-en-212-nyc-carolina-herrera-mujer': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2021/09/15e2bce6a84d4a9b1a9a01bbc38183ba.212-NYC-carolina-herrera-acordes-1.jpg',
    'https://perfumescolombia.com.co/cdn/shop/products/212-nyc-carolina-herrera-11-premium-1920455.png?crop=center&height=720&v=1751884213&width=720'
  ],
  'inspirado-en-212-men-carolina-herrera': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/11/1581.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/212-Men-NYC-de-Carolina-Herrera-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1'
  ],
  '212-vip-men-carolina-herrera': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/11/1582.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/212-VIP-Men-de-Carolina-Herrera-para-hombre-flyer-2.jpg?strip=all&lossy=1&ssl=1'
  ],
  'inspirado-en-212-vip-men-carolina-herrera': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/11/1582.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/212-VIP-Men-de-Carolina-Herrera-para-hombre-flyer-2.jpg?strip=all&lossy=1&ssl=1'
  ],
  '212-vip-ros-carolina-herrera-mujer': [
    'https://facescr.vtexassets.com/arquivos/ids/186794-800-auto?v=638446517979030000&width=800&height=auto&aspect=true',
    'https://noirperfumeria.co/cdn/shop/files/212-vip-ROse-NP.webp?v=1682953708&width=713'
  ],
  '212-vip-rose-carolina-herrera-mujer': [
    'https://facescr.vtexassets.com/arquivos/ids/186794-800-auto?v=638446517979030000&width=800&height=auto&aspect=true',
    'https://noirperfumeria.co/cdn/shop/files/212-vip-ROse-NP.webp?v=1682953708&width=713'
  ],
  'inspirado-en-212-vip-ros-carolina-herrera-mujer': [
    'https://facescr.vtexassets.com/arquivos/ids/186794-800-auto?v=638446517979030000&width=800&height=auto&aspect=true',
    'https://noirperfumeria.co/cdn/shop/files/212-vip-ROse-NP.webp?v=1682953708&width=713'
  ],
  'inspirado-en-212-vip-rose-carolina-herrera-mujer': [
    'https://facescr.vtexassets.com/arquivos/ids/186794-800-auto?v=638446517979030000&width=800&height=auto&aspect=true',
    'https://noirperfumeria.co/cdn/shop/files/212-vip-ROse-NP.webp?v=1682953708&width=713'
  ],
  '212-vip-wild-party-carolina-herrera': [
    'https://www.fraganza.com.co/cdn/shop/products/212-VIP-MEN-WILD-PARTY-DE-HERRERA-100-ML-HOMBRE-470x549_1024x1024@2x.jpg?v=1651439478',
    'https://www.cautivaperfumeria.com/cdn/shop/files/assets_task_01jx2wvdhsfv0b62wq780d7dwd_1749222867_img_1.webp?v=1750112702&width=600'
  ],
  'inspirado-en-212-vip-wild-party-carolina-herrera': [
    'https://www.fraganza.com.co/cdn/shop/products/212-VIP-MEN-WILD-PARTY-DE-HERRERA-100-ML-HOMBRE-470x549_1024x1024@2x.jpg?v=1651439478',
    'https://www.cautivaperfumeria.com/cdn/shop/files/assets_task_01jx2wvdhsfv0b62wq780d7dwd_1749222867_img_1.webp?v=1750112702&width=600'
  ],
  '212-vip-men-wild-party-carolina-herrera': [
    'https://www.fraganza.com.co/cdn/shop/products/212-VIP-MEN-WILD-PARTY-DE-HERRERA-100-ML-HOMBRE-470x549_1024x1024@2x.jpg?v=1651439478',
    'https://www.cautivaperfumeria.com/cdn/shop/files/assets_task_01jx2wvdhsfv0b62wq780d7dwd_1749222867_img_1.webp?v=1750112702&width=600'
  ],
  // ALIASES for women's version (same URLs)
  '212-wild-party-carolina-herrera-mujer': [
    'https://lemowoda.clubcore.com.co/Views/Front/img/webp/products/233-1646317084-1646317084.webp',
    'https://www.fraganza.com.co/cdn/shop/files/212WP27W_grande_1024x1024_2x_4ac8db5a-162b-4d44-a3a8-3e313a9323bd_1024x1024@2x.jpg?v=1747962090'
  ],
  'inspirado-en-212-wild-party-carolina-herrera-mujer': [
    'https://lemowoda.clubcore.com.co/Views/Front/img/webp/products/233-1646317084-1646317084.webp',
    'https://www.fraganza.com.co/cdn/shop/files/212WP27W_grande_1024x1024_2x_4ac8db5a-162b-4d44-a3a8-3e313a9323bd_1024x1024@2x.jpg?v=1747962090'
  ],
  // ALIAS WITHOUT suffix for women's version
  'inspirado-en-212-wild-party-carolina-herrera': [
    'https://lemowoda.clubcore.com.co/Views/Front/img/webp/products/233-1646317084-1646317084.webp',
    'https://www.fraganza.com.co/cdn/shop/files/212WP27W_grande_1024x1024_2x_4ac8db5a-162b-4d44-a3a8-3e313a9323bd_1024x1024@2x.jpg?v=1747962090'
  ],
  '212-wild-party-carolina-herrera': [
    'https://lemowoda.clubcore.com.co/Views/Front/img/webp/products/233-1646317084-1646317084.webp',
    'https://www.fraganza.com.co/cdn/shop/files/212WP27W_grande_1024x1024_2x_4ac8db5a-162b-4d44-a3a8-3e313a9323bd_1024x1024@2x.jpg?v=1747962090'
  ],
  '212-sexy-carolina-herrera': [
    'https://www.luksusimportedstore.com/cdn/shop/files/IMG-1262.jpg?v=1715468543&width=1445',
    'https://www.luksusimportedstore.com/cdn/shop/files/28B6D8C4-190F-4E30-A43B-B4D00CE16F2B.png?v=1715468543&width=1445'
  ],
  'inspirado-en-212-sexy-carolina-herrera': [
    'https://www.luksusimportedstore.com/cdn/shop/files/IMG-1262.jpg?v=1715468543&width=1445',
    'https://www.luksusimportedstore.com/cdn/shop/files/28B6D8C4-190F-4E30-A43B-B4D00CE16F2B.png?v=1715468543&width=1445'
  ],
  '212-sexy-carolina-herrera-mujer': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_713447-MLU72574185874_112023-F.webp',
    'https://perfumescolombia.com.co/cdn/shop/products/212-sexy-carolina-herrera-11-premium-8436157.png?crop=center&height=720&v=1751884214&width=720'
  ],
  'inspirado-en-212-sexy-carolina-herrera-mujer': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_713447-MLU72574185874_112023-F.webp',
    'https://perfumescolombia.com.co/cdn/shop/products/212-sexy-carolina-herrera-11-premium-8436157.png?crop=center&height=720&v=1751884214&width=720'
  ],
  'bad-boy-carolina-herrera': [
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-ch-bad-boy-eau-de-toilette-100ml-hombre-4299344_1024x1024@2x.jpg?v=1758672303',
    'https://perfumesrobols.com/cdn/shop/files/BBEDT-Photoroom.jpg?v=1738723404&width=600'
  ],
  'inspirado-en-bad-boy-carolina-herrera': [
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-ch-bad-boy-eau-de-toilette-100ml-hombre-4299344_1024x1024@2x.jpg?v=1758672303',
    'https://perfumesrobols.com/cdn/shop/files/BBEDT-Photoroom.jpg?v=1738723404&width=600'
  ],
  'ch-carolina-herrera': [
    'https://locionesbogota.com/cdn/shop/products/714di1mVHvL._SL1500.jpg?v=1676301475&width=823',
    'https://fimgs.net/mdimg/perfume-thumbs/375x500.1734.avif'
  ],
  'inspirado-en-ch-carolina-herrera': [
    'https://locionesbogota.com/cdn/shop/products/714di1mVHvL._SL1500.jpg?v=1676301475&width=823',
    'https://fimgs.net/mdimg/perfume-thumbs/375x500.1734.avif'
  ],
  '212-vip-black-red-carolina-herrera': [
    'https://perfulinio.com/wp-content/uploads/2022/11/PERFUME-EQUIVALENCIA-REPLICA-FEROMONAS-212-VIP-BLACK-RED-CAROLINA-HERRERA-100ML.jpg',
    'https://www.fraganza.com.co/cdn/shop/products/carolina-herrera-212-vip-black-red-100ml_580x_5d65722d-1497-4b99-a95a-b1989b9ff68f_1024x1024@2x.jpg?v=1661799442'
  ],
  'inspirado-en-212-vip-black-red-carolina-herrera': [
    'https://perfulinio.com/wp-content/uploads/2022/11/PERFUME-EQUIVALENCIA-REPLICA-FEROMONAS-212-VIP-BLACK-RED-CAROLINA-HERRERA-100ML.jpg',
    'https://www.fraganza.com.co/cdn/shop/products/carolina-herrera-212-vip-black-red-100ml_580x_5d65722d-1497-4b99-a95a-b1989b9ff68f_1024x1024@2x.jpg?v=1661799442'
  ],
  '212-vip-wins-carolina-herrera': [
    'https://www.luksusimportedstore.com/cdn/shop/files/B7FB232C-BA37-4DC3-B6F4-6B96AECC43C7.png?v=1718249458&width=1445',
    'https://www.luksusimportedstore.com/cdn/shop/files/4FA19CEA-8DED-4EFE-8D13-44103F05E685.jpg?v=1718249458&width=1445'
  ],
  'inspirado-en-212-vip-wins-carolina-herrera': [
    'https://farina.com.bo/wp-content/uploads/2021/12/carolina-herrera-212-vip-wins-ad.jpg',
    'https://www.fraganza.com.co/cdn/shop/files/carolina-herrera-212-vip-wins-eau-de-parfum-80ml_1024x1024@2x.webp?v=1747962099'
  ],
  '212-vip-wins-carolina-herrera-mujer': [
    'https://farina.com.bo/wp-content/uploads/2021/12/carolina-herrera-212-vip-wins-ad.jpg',
    'https://www.fraganza.com.co/cdn/shop/files/carolina-herrera-212-vip-wins-eau-de-parfum-80ml_1024x1024@2x.webp?v=1747962099'
  ],
  'inspirado-en-212-vip-wins-carolina-herrera-mujer': [
    'https://farina.com.bo/wp-content/uploads/2021/12/carolina-herrera-212-vip-wins-ad.jpg',
    'https://www.fraganza.com.co/cdn/shop/files/carolina-herrera-212-vip-wins-eau-de-parfum-80ml_1024x1024@2x.webp?v=1747962099'
  ],
  '212-heroes-carolina-herrera': [
    'https://attoperfumes.com.co/cdn/shop/products/212HeroesHm.jpg?v=1649443295',
    'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/8411061974759_5.jpg?scale=500&qlty=75'
  ],
  'inspirado-en-212-heroes-carolina-herrera': [
    'https://attoperfumes.com.co/cdn/shop/products/212HeroesHm.jpg?v=1649443295',
    'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/8411061974759_5.jpg?scale=500&qlty=75'
  ],
  '212-heroes-carolina-herrera-mujer': [
    'https://facescr.vtexassets.com/arquivos/ids/173516-800-auto?v=637965603518430000&width=800&height=auto&aspect=true',
    'https://disfragancias.com/cdn/shop/files/Heroes-600x600.jpg?v=1703994177'
  ],
  'inspirado-en-212-heroes-carolina-herrera-mujer': [
    'https://facescr.vtexassets.com/arquivos/ids/173516-800-auto?v=637965603518430000&width=800&height=auto&aspect=true',
    'https://disfragancias.com/cdn/shop/files/Heroes-600x600.jpg?v=1703994177'
  ],
  'inspirado-en-aqva-bvlgari': [
    'https://perfumescardales.com.ar/wp-content/uploads/2020/01/bvlgari-aqva-marine-edt-1.jpg',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2015/06/Aqva-Pour-Homme-de-Bvlgari-de-hombre-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'aqva-bvlgari': [
    'https://perfumescardales.com.ar/wp-content/uploads/2020/01/bvlgari-aqva-marine-edt-1.jpg',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2015/06/Aqva-Pour-Homme-de-Bvlgari-de-hombre-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'aqva': [
    'https://perfumescardales.com.ar/wp-content/uploads/2020/01/bvlgari-aqva-marine-edt-1.jpg',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2015/06/Aqva-Pour-Homme-de-Bvlgari-de-hombre-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'blv-men-bvlgari': [
    'https://labelleperfumes.com/cdn/shop/files/blv-bulgari-home_1016x.webp?v=1711385698',
    'https://labelleperfumes.com/cdn/shop/files/blv-bulgari-home-ad_1016x.webp?v=1711385698'
  ],
  'inspirado-en-blv-men-bvlgari': [
    'https://labelleperfumes.com/cdn/shop/files/blv-bulgari-home_1016x.webp?v=1711385698',
    'https://labelleperfumes.com/cdn/shop/files/blv-bulgari-home-ad_1016x.webp?v=1711385698'
  ],
  'inspirado-en-omnia-crystaline-65ml-bvlgari': [
    'https://sensationsstore.com/cdn/shop/products/bvlgari-omnia-block-2-listing_1024x1024@2x.jpg?v=1588378315',
    'https://sensationsstore.com/cdn/shop/products/139880_1024x1024@2x.jpg?v=1588378320'
  ],
  'omnia-crystaline-65ml-bvlgari': [
    'https://sensationsstore.com/cdn/shop/products/bvlgari-omnia-block-2-listing_1024x1024@2x.jpg?v=1588378315',
    'https://sensationsstore.com/cdn/shop/products/139880_1024x1024@2x.jpg?v=1588378320'
  ],
  'inspirado-en-omnia-amethyste-65ml-bvlgari': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2023/09/0f1c8a0afee6f1fa156b08c06192ae9c.acordes-amethyste-3.jpg',
    'https://perfumerialusso.co/wp-content/uploads/2021/03/BVLGARI-OMNIA-AMAETHYSTE-65-ML-EDT.jpg'
  ],
  'omnia-amethyste-65ml-bvlgari': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2023/09/0f1c8a0afee6f1fa156b08c06192ae9c.acordes-amethyste-3.jpg',
    'https://perfumerialusso.co/wp-content/uploads/2021/03/BVLGARI-OMNIA-AMAETHYSTE-65-ML-EDT.jpg'
  ],
  'inspirado-en-omnia-coral-65ml-bvlgari': [
    'https://madeira.com.co/cdn/shop/files/783320420672_2.jpg?v=1723552936&width=720',
    'https://www.timeshopcolombia.com/images/stories/virtuemart/product/resized/omnia-coral-de-bvlgari-edt-65-ml-22-oz-para-mujer-perfumes-de-mujer7_250x250.jpg'
  ],
  'omnia-coral-65ml-bvlgari': [
    'https://madeira.com.co/cdn/shop/files/783320420672_2.jpg?v=1723552936&width=720',
    'https://www.timeshopcolombia.com/images/stories/virtuemart/product/resized/omnia-coral-de-bvlgari-edt-65-ml-22-oz-para-mujer-perfumes-de-mujer7_250x250.jpg'
  ],
  'inspirado-en-omnia-paraiba-65ml-bvlgari': [
    'https://luxuryandbeautybyfederica.com/cdn/shop/products/image_ba462f7f-6038-4ce9-864e-3ef637ba8ace_480x.jpg?v=1665570289',
    'https://pabangoph.com/cdn/shop/products/BvlgariOmniaParaiba-2.jpg?v=1610220056'
  ],
  'omnia-paraiba-65ml-bvlgari': [
    'https://luxuryandbeautybyfederica.com/cdn/shop/products/image_ba462f7f-6038-4ce9-864e-3ef637ba8ace_480x.jpg?v=1665570289',
    'https://pabangoph.com/cdn/shop/products/BvlgariOmniaParaiba-2.jpg?v=1610220056'
  ],
  'inspirado-en-omnia-coral-100ml-bvlgari': [
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/original/14853484-1735270685943590.jpg&format=webp&auto=avif&width=820&height=820&fit=cover',
    'https://i.ebayimg.com/images/g/T0IAAeSwiWFosyi7/s-l1600.webp'
  ],
  'omnia-coral-100ml-bvlgari': [
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/original/14853484-1735270685943590.jpg&format=webp&auto=avif&width=820&height=820&fit=cover',
    'https://i.ebayimg.com/images/g/T0IAAeSwiWFosyi7/s-l1600.webp'
  ],
  'inspirado-en-omnia-crystaline-100ml-bvlgari': [
    'https://dam.elcorteingles.es/producto/www-001013512365001-02.jpg?impolicy=Resize&width=967&height=1200',
    'https://attoperfumes.com.co/cdn/shop/files/Omnia-Crystalline_100-ml.jpg?v=1716332849&width=600'
  ],
  'omnia-crystaline-100ml-bvlgari': [
    'https://dam.elcorteingles.es/producto/www-001013512365001-02.jpg?impolicy=Resize&width=967&height=1200',
    'https://attoperfumes.com.co/cdn/shop/files/Omnia-Crystalline_100-ml.jpg?v=1716332849&width=600'
  ],
  'inspirado-en-omnia-amethyste-100ml-bvlgari': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2023/09/0f1c8a0afee6f1fa156b08c06192ae9c.acordes-amethyste-3.jpg',
    'https://fraganceroscolombia.com.co/wp-content/webp-express/webp-images/uploads/2024/09/BVLGARI-OMNIA-AMETHYSTE.jpeg.webp'
  ],
  'omnia-amethyste-100ml-bvlgari': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2023/09/0f1c8a0afee6f1fa156b08c06192ae9c.acordes-amethyste-3.jpg',
    'https://fraganceroscolombia.com.co/wp-content/webp-express/webp-images/uploads/2024/09/BVLGARI-OMNIA-AMETHYSTE.jpeg.webp'
  ],
  'ck-one-calvin-klein': [
    'https://disfragancias.com/cdn/shop/files/Calvin-Klein-CK-One.jpg?v=1699644460',
    'https://disfragancias.com/cdn/shop/files/CK.png?v=1725727369'
  ],
  'inspirado-en-ck-one-calvin-klein': [
    'https://disfragancias.com/cdn/shop/files/Calvin-Klein-CK-One.jpg?v=1699644460',
    'https://disfragancias.com/cdn/shop/files/CK.png?v=1725727369'
  ],
  'ck-in-2u-calvin-klein': [
    'https://madeira.com.co/cdn/shop/products/088300196937_1_eb62d4a7-ee53-459f-8a30-d8d1af169ec2.jpg?v=1609889649&width=720',
    'https://fimgs.net/photogram/p180/np/lu/sHJhhWkjyW4WPLDc.jpg'
  ],
  'inspirado-en-ck-in-2u-calvin-klein': [
    'https://madeira.com.co/cdn/shop/products/088300196937_1_eb62d4a7-ee53-459f-8a30-d8d1af169ec2.jpg?v=1609889649&width=720',
    'https://fimgs.net/photogram/p180/np/lu/sHJhhWkjyW4WPLDc.jpg'
  ],
  'euphoria-men-calvin-klein': [
    'https://disfragancias.com/cdn/shop/files/Euphoria-men.jpg?v=1705011977',
    'https://farina.com.bo/wp-content/uploads/2021/02/calcalvin-klein-euphoria-men-ad.jpg'
  ],
  'inspirado-en-euphoria-men-calvin-klein': [
    'https://disfragancias.com/cdn/shop/files/Euphoria-men.jpg?v=1705011977',
    'https://farina.com.bo/wp-content/uploads/2021/02/calcalvin-klein-euphoria-men-ad.jpg'
  ],
  'eternity-calvin-klein': [
    'https://lmd.com.co/cdn/shop/files/Perfume_Eternity_De_200ml_Calvin_Klein_Para_Hombre.png?v=1730303598&width=493',
    'https://m.media-amazon.com/images/I/810Wn4aagvL._SX522_.jpg'
  ],
  'inspirado-en-eternity-calvin-klein': [
    'https://lmd.com.co/cdn/shop/files/Perfume_Eternity_De_200ml_Calvin_Klein_Para_Hombre.png?v=1730303598&width=493',
    'https://m.media-amazon.com/images/I/810Wn4aagvL._SX522_.jpg'
  ],
  'blue-label-givenchy': [
    'https://disfragancias.com/cdn/shop/files/givenchy_blue_2.jpg?v=1726700753',
    'https://perfugroupar.vtexassets.com/arquivos/ids/175773-800-auto?v=637907441900500000&width=800&height=auto&aspect=true'
  ],
  'inspirado-en-blue-label-givenchy': [
    'https://disfragancias.com/cdn/shop/files/givenchy_blue_2.jpg?v=1726700753',
    'https://perfugroupar.vtexassets.com/arquivos/ids/175773-800-auto?v=637907441900500000&width=800&height=auto&aspect=true'
  ],
  'silver-mountain-creed': [
    'https://mundoreloj.com.co/wp-content/uploads/2024/04/Creed-Silver-Mountain-Water-02.webp',
    'https://mwhite.com.co/cdn/shop/files/perfume-creed-silver-montain-water-100-ml-perfumes-567.webp?v=1728590598&width=493'
  ],
  'inspirado-en-silver-mountain-creed': [
    'https://mundoreloj.com.co/wp-content/uploads/2024/04/Creed-Silver-Mountain-Water-02.webp',
    'https://mwhite.com.co/cdn/shop/files/perfume-creed-silver-montain-water-100-ml-perfumes-567.webp?v=1728590598&width=493'
  ],
  'scandal-jean-paul-gaultier': [
    'https://facescr.vtexassets.com/arquivos/ids/190688-800-auto?v=638555348994570000&width=800&height=auto&aspect=true',
    'https://facescr.vtexassets.com/arquivos/ids/190690-800-auto?v=638555349310800000&width=800&height=auto&aspect=true'
  ],
  'inspirado-en-scandal-jean-paul-gaultier': [
    'https://facescr.vtexassets.com/arquivos/ids/190688-800-auto?v=638555348994570000&width=800&height=auto&aspect=true',
    'https://facescr.vtexassets.com/arquivos/ids/190690-800-auto?v=638555349310800000&width=800&height=auto&aspect=true'
  ],
  'le-male-jean-paul-gaultier': [
    'https://perfumescolombia.com.co/cdn/shop/files/jean-paul-gaultier-le-male-125ml-edt-11-premium-8960945.png?crop=center&height=756&v=1751884142&width=720',
    'https://lafrancoar.vtexassets.com/arquivos/ids/164240-800-800?v=638876004242430000&width=800&height=800&aspect=true'
  ],
  'inspirado-en-le-male-jean-paul-gaultier': [
    'https://perfumescolombia.com.co/cdn/shop/files/jean-paul-gaultier-le-male-125ml-edt-11-premium-8960945.png?crop=center&height=756&v=1751884142&width=720',
    'https://lafrancoar.vtexassets.com/arquivos/ids/164240-800-800?v=638876004242430000&width=800&height=800&aspect=true'
  ],
  'ultra-male-jean-paul-gaultier': [
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-jean-paul-ultra-male-eau-de-toilette-intense-125ml-hombre-5040282_1024x1024@2x.jpg?v=1758671221',
    'https://labelleperfumes.com/cdn/shop/files/jean-paul-gaultier-ultra-male-all1_800x.webp?v=1727210263'
  ],
  'inspirado-en-ultra-male-jean-paul-gaultier': [
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-jean-paul-ultra-male-eau-de-toilette-intense-125ml-hombre-5040282_1024x1024@2x.jpg?v=1758671221',
    'https://labelleperfumes.com/cdn/shop/files/jean-paul-gaultier-ultra-male-all1_800x.webp?v=1727210263'
  ],
  'elixir-jean-paul-gaultier': [
    'https://cosmetic.cl/cdn/shop/files/png_37979e3c-f988-47d8-a63a-226f40fe8d11_600x.png?v=1745953637',
    'https://media.sephora.eu/content/dam/digital/pim/published/J/JEAN_PAUL_GAULTIER/P10051068/92716-media_1.jpg?scaleWidth=undefined&scaleHeight=undefined&scaleMode=undefined'
  ],
  'inspirado-en-elixir-jean-paul-gaultier': [
    'https://cosmetic.cl/cdn/shop/files/png_37979e3c-f988-47d8-a63a-226f40fe8d11_600x.png?v=1745953637',
    'https://media.sephora.eu/content/dam/digital/pim/published/J/JEAN_PAUL_GAULTIER/P10051068/92716-media_1.jpg?scaleWidth=undefined&scaleHeight=undefined&scaleMode=undefined'
  ],
  'l12-12-noir-lacoste': [
    'https://labelleperfumes.com/cdn/shop/files/lacoste-l-12-12-noir-men-notes_1300x.webp?v=1728678219',
    'https://labelleperfumes.com/cdn/shop/files/lacoste-l-12-12-noir-men_1300x.webp?v=1728678219'
  ],
  'inspirado-en-l12-12-noir-lacoste': [
    'https://labelleperfumes.com/cdn/shop/files/lacoste-l-12-12-noir-men-notes_1300x.webp?v=1728678219',
    'https://labelleperfumes.com/cdn/shop/files/lacoste-l-12-12-noir-men_1300x.webp?v=1728678219'
  ],
  'l12-12-vert-lacoste': [
    'https://fimgs.net/photogram/p180/ot/nm/FRDz40k2TzBvMmH0.jpg',
    'https://perfumescolombia.com.co/cdn/shop/files/lacoste-l1212-green-100ml-edt-11-premium-2571756.png?crop=center&height=720&v=1751884117&width=720'
  ],
  'inspirado-en-l12-12-vert-lacoste': [
    'https://fimgs.net/photogram/p180/ot/nm/FRDz40k2TzBvMmH0.jpg',
    'https://perfumescolombia.com.co/cdn/shop/files/lacoste-l1212-green-100ml-edt-11-premium-2571756.png?crop=center&height=720&v=1751884117&width=720'
  ],
  'l12-12-rouge-lacoste': [
    'https://tusaludybelleza.co/cdn/shop/files/Perfume_Lacoste_L12_Rouge_EDT_envioacasa.co_envio_a_casa_1.webp?v=1736182620&width=713',
    'https://locionesbogota.com/cdn/shop/products/D_NQ_NP_998348-MLC43746385603_102020-O.jpg'
  ],
  'inspirado-en-l12-12-rouge-lacoste': [
    'https://tusaludybelleza.co/cdn/shop/files/Perfume_Lacoste_L12_Rouge_EDT_envioacasa.co_envio_a_casa_1.webp?v=1736182620&width=713',
    'https://locionesbogota.com/cdn/shop/products/D_NQ_NP_998348-MLC43746385603_102020-O.jpg'
  ],
  'le-beau-parfum-jean-paul-gaultier': [
    'https://medipielsa.vtexassets.com/arquivos/ids/194737-800-auto?v=638743625102800000&width=800&height=auto&aspect=true',
    'https://medipielsa.vtexassets.com/arquivos/ids/194736-800-auto?v=638743625102800000&width=800&height=auto&aspect=true'
  ],
  'inspirado-en-le-beau-parfum-jean-paul-gaultier': [
    'https://medipielsa.vtexassets.com/arquivos/ids/194737-800-auto?v=638743625102800000&width=800&height=auto&aspect=true',
    'https://medipielsa.vtexassets.com/arquivos/ids/194736-800-auto?v=638743625102800000&width=800&height=auto&aspect=true'
  ],
  'le-beau-jean-paul-gaultier': [
    'https://envioacasa.co/cdn/shop/files/Perfume_Jean_Paul_Gaultier_Le_Male_Le_Beau_Hombre_125_ml_EDT_ENVIOACASA.CO_ENVIO_A_CASA_05_6b3b0dcc-3d18-4af8-a283-cd5bb9f565e2.jpg?v=1731223107&width=713',
    'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/8435415062190_4.jpg?scale=500&qlty=75'
  ],
  'inspirado-en-le-beau-jean-paul-gaultier': [
    'https://envioacasa.co/cdn/shop/files/Perfume_Jean_Paul_Gaultier_Le_Male_Le_Beau_Hombre_125_ml_EDT_ENVIOACASA.CO_ENVIO_A_CASA_05_6b3b0dcc-3d18-4af8-a283-cd5bb9f565e2.jpg?v=1731223107&width=713',
    'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/8435415062190_4.jpg?scale=500&qlty=75'
  ],
  'l12-12-blue-lacoste': [
    'https://perfumescolombia.com.co/cdn/shop/files/lacoste-l1212-bleu-11-premium-4754575.png?crop=center&height=720&v=1751884117&width=720',
    'https://fimgs.net/mdimg/secundar/fit.64911.jpg'
  ],
  'inspirado-en-l12-12-blue-lacoste': [
    'https://perfumescolombia.com.co/cdn/shop/files/lacoste-l1212-bleu-11-premium-4754575.png?crop=center&height=720&v=1751884117&width=720',
    'https://fimgs.net/mdimg/secundar/fit.64911.jpg'
  ],
  'l12-12-blanc-lacoste': [
    'https://aromatica.cr/cdn/shop/files/Decant-L.12.12-Blanco-para-hombre-Aromatica-CR-453023782.jpg?v=1751998210&width=600',
    'https://perfumescolombia.com.co/cdn/shop/files/lacoste-l1212-white-11-premium-5923978.png?crop=center&height=720&v=1751884116&width=720'
  ],
  'inspirado-en-l12-12-blanc-lacoste': [
    'https://aromatica.cr/cdn/shop/files/Decant-L.12.12-Blanco-para-hombre-Aromatica-CR-453023782.jpg?v=1751998210&width=600',
    'https://perfumescolombia.com.co/cdn/shop/files/lacoste-l1212-white-11-premium-5923978.png?crop=center&height=720&v=1751884116&width=720'
  ],
  'one-million-paco-rabanne': [
    'https://www.aromaespejo.com/cdn/shop/files/5444545-Photoroom.jpg?v=1745644934&width=1100',
    'https://disfragancias.com/cdn/shop/files/One-million.jpg?v=1702586149'
  ],
  'inspirado-en-one-million-paco-rabanne': [
    'https://www.aromaespejo.com/cdn/shop/files/5444545-Photoroom.jpg?v=1745644934&width=1100',
    'https://disfragancias.com/cdn/shop/files/One-million.jpg?v=1702586149'
  ],
  'essential-lacoste': [
    'https://lmd.com.co/cdn/shop/files/Essential_de_Lacoste.webp?v=1737412752&width=493',
    'https://fimgs.net/photogram/p180/y5/ll/K0abTJyuKzVUa782.jpg'
  ],
  'inspirado-en-essential-lacoste': [
    'https://lmd.com.co/cdn/shop/files/Essential_de_Lacoste.webp?v=1737412752&width=493',
    'https://fimgs.net/photogram/p180/y5/ll/K0abTJyuKzVUa782.jpg'
  ],
  'red-lacoste': [
    'https://perfumescolombia.com.co/cdn/shop/files/lacoste-red-100ml-edt-11-premium-2571405.png?crop=center&height=720&v=1751884104&width=720',
    'https://cdn5.coppel.com/mkp/103012151-4.jpg?iresize=width:564,height:451'
  ],
  'inspirado-en-red-lacoste': [
    'https://perfumescolombia.com.co/cdn/shop/files/lacoste-red-100ml-edt-11-premium-2571405.png?crop=center&height=720&v=1751884104&width=720',
    'https://cdn5.coppel.com/mkp/103012151-4.jpg?iresize=width:564,height:451'
  ],
  'one-million-lucky-paco-rabanne': [
    'https://perfumartevip.com/wp-content/uploads/2022/06/One-Million-Lucky-Paco-Rabanne-100ml-scaled-e1682008768971.webp',
    'https://perfumescolombia.com.co/cdn/shop/files/one-million-lucky-100ml-edt-11-premium-6192402.png?crop=center&height=720&v=1751884110&width=720'
  ],
  'inspirado-en-one-million-lucky-paco-rabanne': [
    'https://perfumartevip.com/wp-content/uploads/2022/06/One-Million-Lucky-Paco-Rabanne-100ml-scaled-e1682008768971.webp',
    'https://perfumescolombia.com.co/cdn/shop/files/one-million-lucky-100ml-edt-11-premium-6192402.png?crop=center&height=720&v=1751884110&width=720'
  ],
  'one-million-prive-paco-rabanne': [
    'https://farina.com.bo/wp-content/uploads/2022/02/paco-rabanne-one-millon-prive-EDT-arte3.jpg',
    'https://pubperfumes.com.br/wp-content/uploads/2024/12/milion-priv-600x600.webp'
  ],
  'inspirado-en-one-million-prive-paco-rabanne': [
    'https://farina.com.bo/wp-content/uploads/2022/02/paco-rabanne-one-millon-prive-EDT-arte3.jpg',
    'https://pubperfumes.com.br/wp-content/uploads/2024/12/milion-priv-600x600.webp'
  ],
  'invictus-paco-rabanne': [
    'https://www.luksusimportedstore.com/cdn/shop/files/4BD15E7A-4292-45AA-9C3E-860ABD716FE8.jpg?v=1730403395&width=1445',
    'https://media.sephora.eu/content/dam/digital/pim/published/R/RABANNE_FRAGRANCES/P10013938/57421-media_3.jpg?scaleWidth=undefined&scaleHeight=undefined&scaleMode=undefined'
  ],
  'inspirado-en-invictus-paco-rabanne': [
    'https://www.luksusimportedstore.com/cdn/shop/files/4BD15E7A-4292-45AA-9C3E-860ABD716FE8.jpg?v=1730403395&width=1445',
    'https://media.sephora.eu/content/dam/digital/pim/published/R/RABANNE_FRAGRANCES/P10013938/57421-media_3.jpg?scaleWidth=undefined&scaleHeight=undefined&scaleMode=undefined'
  ],
  'invictus-legend-paco-rabanne': [
    'https://disfragancias.com/cdn/shop/files/Paco-rabanne-Invictus-Legend.jpg?v=1705523397',
    'https://media.sephora.eu/content/dam/digital/pim/published/R/RABANNE_FRAGRANCES/P10013938/57421-media_3.jpg?scaleWidth=undefined&scaleHeight=undefined&scaleMode=undefined'
  ],
  'inspirado-en-invictus-legend-paco-rabanne': [
    'https://disfragancias.com/cdn/shop/files/Paco-rabanne-Invictus-Legend.jpg?v=1705523397',
    'https://media.sephora.eu/content/dam/digital/pim/published/R/RABANNE_FRAGRANCES/P10013938/57421-media_3.jpg?scaleWidth=undefined&scaleHeight=undefined&scaleMode=undefined'
  ],
  'invictus-victory-paco-rabanne': [
    'https://facescr.vtexassets.com/arquivos/ids/171227-800-auto?v=637800444057070000&width=800&height=auto&aspect=true',
    'https://attoperfumes.com.co/cdn/shop/products/InvictusVictory.jpg?v=1650485343&width=600'
  ],
  'inspirado-en-invictus-victory-paco-rabanne': [
    'https://facescr.vtexassets.com/arquivos/ids/171227-800-auto?v=637800444057070000&width=800&height=auto&aspect=true',
    'https://attoperfumes.com.co/cdn/shop/products/InvictusVictory.jpg?v=1650485343&width=600'
  ],
  'invictus-victory-elixir-paco-rabanne': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_775363-MLU76281210495_052024-F.webp',
    'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/cl/paris/218373999/variant/68c199210625ca61a9c3f9f8/images/caf70e11-3680-436e-b1fc-c9f22faa9921/218373999-0000-006.jpg'
  ],
  'inspirado-en-invictus-victory-elixir-paco-rabanne': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_775363-MLU76281210495_052024-F.webp',
    'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/cl/paris/218373999/variant/68c199210625ca61a9c3f9f8/images/caf70e11-3680-436e-b1fc-c9f22faa9921/218373999-0000-006.jpg'
  ],
  'invictus-onix-paco-rabanne': [
    'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/3349668580446_5.jpg?scale=500&qlty=75',
    'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/3349668580446_2.jpg?scale=500&qlty=75'
  ],
  'inspirado-en-invictus-onix-paco-rabanne': [
    'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/3349668580446_5.jpg?scale=500&qlty=75',
    'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/3349668580446_2.jpg?scale=500&qlty=75'
  ],
  'invictus-parfum-paco-rabanne': [
    'https://disfragancias.com/cdn/shop/files/pacorabanneinvictusparfum2.jpg?v=1715653904',
    'https://disfragancias.com/cdn/shop/files/paco_rabanne_invictus_parfum_3.jpg?v=1720182548'
  ],
  'inspirado-en-invictus-parfum-paco-rabanne': [
    'https://disfragancias.com/cdn/shop/files/pacorabanneinvictusparfum2.jpg?v=1715653904',
    'https://disfragancias.com/cdn/shop/files/paco_rabanne_invictus_parfum_3.jpg?v=1720182548'
  ],
  'phantom-paco-rabanne': [
    'https://www.lineaestetica.co/wp-content/uploads/2025/03/10360-2-PACO-RABANNE-Phantom-Elixir-Parfum-Intense-X-100M-linea-estetica.jpg',
    'https://www.lineaestetica.co/wp-content/uploads/2025/03/10360-1-PACO-RABANNE-Phantom-Elixir-Parfum-Intense-X-100M-linea-estetica.jpg'
  ],
  'inspirado-en-phantom-paco-rabanne': [
    'https://www.lineaestetica.co/wp-content/uploads/2025/03/10360-2-PACO-RABANNE-Phantom-Elixir-Parfum-Intense-X-100M-linea-estetica.jpg',
    'https://www.lineaestetica.co/wp-content/uploads/2025/03/10360-1-PACO-RABANNE-Phantom-Elixir-Parfum-Intense-X-100M-linea-estetica.jpg'
  ],
  'black-xs-paco-rabanne': [
    'https://fimgs.net/photogram/p180/kx/6p/AymS7jUb9wiBLxFK.jpg',
    'https://m.media-amazon.com/images/I/61qCg2aMyaL._AC_SL1500_.jpg'
  ],
  'inspirado-en-black-xs-paco-rabanne': [
    'https://fimgs.net/photogram/p180/kx/6p/AymS7jUb9wiBLxFK.jpg',
    'https://m.media-amazon.com/images/I/61qCg2aMyaL._AC_SL1500_.jpg'
  ],
  'black-xs-lexcess-paco-rabanne': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_761462-MLU76926761417_062024-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_744746-MLU76722688304_062024-F.webp'
  ],
  'inspirado-en-black-xs-lexcess-paco-rabanne': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_761462-MLU76926761417_062024-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_744746-MLU76722688304_062024-F.webp'
  ],
  'bleu-de-chanel-chanel': [
    'https://perfumescolombia.com.co/cdn/shop/products/bleu-de-chanel-parfum-11-premium-1906423.png?crop=center&height=720&v=1751884230&width=720',
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-bleu-chanel-eau-de-parfum-100ml-hombre-5582925_1024x1024@2x.jpg?v=1758672388'
  ],
  'inspirado-en-bleu-de-chanel-chanel': [
    'https://perfumescolombia.com.co/cdn/shop/products/bleu-de-chanel-parfum-11-premium-1906423.png?crop=center&height=720&v=1751884230&width=720',
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-bleu-chanel-eau-de-parfum-100ml-hombre-5582925_1024x1024@2x.jpg?v=1758672388'
  ],
  'allure-homme-sport-chanel': [
    'https://static.sweetcare.com/img/prd/488/v-638562955959509082/chanel-008531cl-1.webp',
    'https://perfumescolombia.com.co/cdn/shop/products/allure-homme-sport-chanel-11-premium-4077638.png?crop=center&height=720&v=1751884229&width=720'
  ],
  'inspirado-en-allure-homme-sport-chanel': [
    'https://static.sweetcare.com/img/prd/488/v-638562955959509082/chanel-008531cl-1.webp',
    'https://perfumescolombia.com.co/cdn/shop/products/allure-homme-sport-chanel-11-premium-4077638.png?crop=center&height=720&v=1751884229&width=720'
  ],
  'polo-red-ralph-lauren': [
    'https://madeira.com.co/cdn/shop/products/3605972321794_2.jpg?v=1630071789&width=720',
    'https://madeira.com.co/cdn/shop/products/3605972321794_1.jpg?v=1630071789&width=720'
  ],
  'inspirado-en-polo-red-ralph-lauren': [
    'https://madeira.com.co/cdn/shop/products/3605972321794_2.jpg?v=1630071789&width=720',
    'https://madeira.com.co/cdn/shop/products/3605972321794_1.jpg?v=1630071789&width=720'
  ],
  'emblem-mont-blanc': [
    'https://sumerlabs.com/default/image-tool-lambda?new-width=700&new-height=700&new-quality=80&url-image=https%3A%2F%2Fsumerlabs.com%2Fprod%2Fcatalogue%2F10aeb490207a9e77cabc572be50755f74b3f57d4%2Fimage2ewxueae9k8hm3uf5l62.webp',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Perfume-Emblem-de-Mont-Blanc-hombre-edt-Lorens.jpg?strip=all&lossy=1&ssl=1'
  ],
  'inspirado-en-emblem-mont-blanc': [
    'https://sumerlabs.com/default/image-tool-lambda?new-width=700&new-height=700&new-quality=80&url-image=https%3A%2F%2Fsumerlabs.com%2Fprod%2Fcatalogue%2F10aeb490207a9e77cabc572be50755f74b3f57d4%2Fimage2ewxueae9k8hm3uf5l62.webp',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Perfume-Emblem-de-Mont-Blanc-hombre-edt-Lorens.jpg?strip=all&lossy=1&ssl=1'
  ],
  'issey-miyake-men-issey-miyake': [
    'https://static.sweetcare.com/img/prd/488/v-638614742425058604/issey-miyake-021859iy-1.webp',
    'https://perfumesmundiales.com/wp-content/uploads/2020/08/Perfume-Issey-Miyake-510x510.png'
  ],
  'inspirado-en-issey-miyake-men-issey-miyake': [
    'https://static.sweetcare.com/img/prd/488/v-638614742425058604/issey-miyake-021859iy-1.webp',
    'https://perfumesmundiales.com/wp-content/uploads/2020/08/Perfume-Issey-Miyake-510x510.png'
  ],
  '360-men-perry-ellis': [
    'https://aromatica.cr/cdn/shop/files/360_-for-Men-Perry-Ellis-EDT-para-hombre-Aromatica-CR-352314.jpg?v=1727577821&width=600',
    'https://m.media-amazon.com/images/I/31uAvTIXtxL.jpg'
  ],
  'inspirado-en-360-men-perry-ellis': [
    'https://aromatica.cr/cdn/shop/files/360_-for-Men-Perry-Ellis-EDT-para-hombre-Aromatica-CR-352314.jpg?v=1727577821&width=600',
    'https://m.media-amazon.com/images/I/31uAvTIXtxL.jpg'
  ],
  '360-red-men-perry-ellis': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Perfume-360-Red-de-Perry-Ellis-para-hombre-Lorens.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/360-Red-de-Perry-Ellis-para-hombre-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'inspirado-en-360-red-men-perry-ellis': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Perfume-360-Red-de-Perry-Ellis-para-hombre-Lorens.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/360-Red-de-Perry-Ellis-para-hombre-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'swiss-army-victorinox': [
    'https://media.victorinox.com/transform/c1d93a51-54d7-4e93-9c73-eef414b05f50/FRA_V0000889_B-tif?io=transform%3Acrop%2Cheight%3A1000%2Cwidth%3A1000%2Cpath%3Asquare&io=transform%3Afill%2Cwidth%3A863%2Cheight%3A830&quality=100',
    'https://media.victorinox.com/transform/04aca3c3-429b-4d17-a635-81f90011fefd/FRA_V0000889_P6-jpg?io=transform%3Abackground%2Ccolor%3AF0F0F0&io=transform%3Afit%2Cwidth%3A900%2Cheight%3A650&quality=100'
  ],
  'inspirado-en-swiss-army-victorinox': [
    'https://media.victorinox.com/transform/c1d93a51-54d7-4e93-9c73-eef414b05f50/FRA_V0000889_B-tif?io=transform%3Acrop%2Cheight%3A1000%2Cwidth%3A1000%2Cpath%3Asquare&io=transform%3Afill%2Cwidth%3A863%2Cheight%3A830&quality=100',
    'https://media.victorinox.com/transform/04aca3c3-429b-4d17-a635-81f90011fefd/FRA_V0000889_P6-jpg?io=transform%3Abackground%2Ccolor%3AF0F0F0&io=transform%3Afit%2Cwidth%3A900%2Cheight%3A650&quality=100'
  ],
  'polo-blue-ralph-lauren': [
    'https://farina.com.bo/wp-content/uploads/2021/09/ralph-lauren-polo-blue-EDP-arte.jpg',
    'https://luxusmayorista.store/cdn/shop/files/PBRL-120167.png?v=1714496169&width=493'
  ],
  'inspirado-en-polo-blue-ralph-lauren': [
    'https://farina.com.bo/wp-content/uploads/2021/09/ralph-lauren-polo-blue-EDP-arte.jpg',
    'https://luxusmayorista.store/cdn/shop/files/PBRL-120167.png?v=1714496169&width=493'
  ],
  'polo-black-ralph-lauren': [
    'https://felix.com.pa/cdn/shop/files/1211-S2352600_3_600x.png?v=1704900999',
    'https://felix.com.pa/cdn/shop/files/polo-black-edt-75ml-1211-s2352600_1_600x.jpg?v=1704902448'
  ],
  'inspirado-en-polo-black-ralph-lauren': [
    'https://felix.com.pa/cdn/shop/files/1211-S2352600_3_600x.png?v=1704900999',
    'https://felix.com.pa/cdn/shop/files/polo-black-edt-75ml-1211-s2352600_1_600x.jpg?v=1704902448'
  ],
  'legend-mont-blanc': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Legend-Edt-de-Montblanc-para-hombre-Lorens.jpg?strip=all&lossy=1&ssl=1',
    'https://luxusmayorista.store/cdn/shop/files/MBLM-120120.png?v=1713918907&width=493'
  ],
  'inspirado-en-legend-mont-blanc': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Legend-Edt-de-Montblanc-para-hombre-Lorens.jpg?strip=all&lossy=1&ssl=1',
    'https://luxusmayorista.store/cdn/shop/files/MBLM-120120.png?v=1713918907&width=493'
  ],
  'acqua-di-gio-giorgio-armani': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Acqua-Di-Gio-de-Giorgio-Armani-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1',
    'https://www.luksusimportedstore.com/cdn/shop/files/IMG-7054.jpg?v=1703077110&width=1445'
  ],
  'inspirado-en-acqua-di-gio-giorgio-armani': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Acqua-Di-Gio-de-Giorgio-Armani-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1',
    'https://www.luksusimportedstore.com/cdn/shop/files/IMG-7054.jpg?v=1703077110&width=1445'
  ],
  'happy-clinique': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Perfume-Clinique-Happy-for-Men-de-Clinique-hombre-Lorens.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Clinique-Happy-de-Clinique-para-hombre-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'inspirado-en-happy-clinique': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Perfume-Clinique-Happy-for-Men-de-Clinique-hombre-Lorens.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Clinique-Happy-de-Clinique-para-hombre-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'toy-boy-moschino': [
    'https://www.lmching.com/cdn/shop/files/D_anm_i-389_372a22a2-a9c4-4675-be77-420613b584d0_1800x1800.jpg?v=1723314503',
    'https://static.wixstatic.com/media/85adb6_df371605d74845b48c9f43038d20e3a4~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/85adb6_df371605d74845b48c9f43038d20e3a4~mv2.jpg'
  ],
  'inspirado-en-toy-boy-moschino': [
    'https://www.lmching.com/cdn/shop/files/D_anm_i-389_372a22a2-a9c4-4675-be77-420613b584d0_1800x1800.jpg?v=1723314503',
    'https://static.wixstatic.com/media/85adb6_df371605d74845b48c9f43038d20e3a4~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/85adb6_df371605d74845b48c9f43038d20e3a4~mv2.jpg'
  ],
  'paris-men-paris-hilton': [
    'https://aromatica.cr/cdn/shop/files/Paris-Hilton-for-Men-EDT-para-hombre-100-ml-Aromatica-CR-394915.jpg?v=1727576893&width=600',
    'https://holacompras.com/wp-content/uploads/2021/10/PERF-PHHOM-Prod-1000x1000.jpg'
  ],
  'inspirado-en-paris-men-paris-hilton': [
    'https://aromatica.cr/cdn/shop/files/Paris-Hilton-for-Men-EDT-para-hombre-100-ml-Aromatica-CR-394915.jpg?v=1727576893&width=600',
    'https://holacompras.com/wp-content/uploads/2021/10/PERF-PHHOM-Prod-1000x1000.jpg'
  ],
  'voyage-nautica': [
    'https://mundoreloj.com.co/wp-content/uploads/2023/11/Perfume-Nautica-Voyage-Men-31655531908-2.jpg.webp',
    'https://mundoreloj.com.co/wp-content/uploads/2023/11/Perfume-Nautica-Voyage-Men-31655531908-1.jpg.webp'
  ],
  'inspirado-en-voyage-nautica': [
    'https://mundoreloj.com.co/wp-content/uploads/2023/11/Perfume-Nautica-Voyage-Men-31655531908-2.jpg.webp',
    'https://mundoreloj.com.co/wp-content/uploads/2023/11/Perfume-Nautica-Voyage-Men-31655531908-1.jpg.webp'
  ],
  'acqua-di-gio-profumo-giorgio-armani': [
    'https://disfragancias.com/cdn/shop/files/gio_2.png?v=1725722907',
    'https://disfragancias.com/cdn/shop/files/Aqua_Di_Gio.png?v=1730412441'
  ],
  'inspirado-en-acqua-di-gio-profumo-giorgio-armani': [
    'https://disfragancias.com/cdn/shop/files/gio_2.png?v=1725722907',
    'https://disfragancias.com/cdn/shop/files/Aqua_Di_Gio.png?v=1730412441'
  ],
  'stronger-with-you-emporio-armani': [
    'https://cdn.notinoimg.com/detail_main_hq/armani/03605522040229_02/emporio-stronger-with-you___250923.jpg',
    'https://cdn.notinoimg.com/detail_main_hq/armani/03605522040588_02-o/emporio-stronger-with-you___220629.jpg'
  ],
  'inspirado-en-stronger-with-you-emporio-armani': [
    'https://cdn.notinoimg.com/detail_main_hq/armani/03605522040229_02/emporio-stronger-with-you___250923.jpg',
    'https://cdn.notinoimg.com/detail_main_hq/armani/03605522040588_02-o/emporio-stronger-with-you___220629.jpg'
  ],
  'uomo-valentino': [
    'https://static.sweetcare.com/img/prd/488/v-638200526858852870/valentino-011305vl-2.webp',
    'https://static.sweetcare.com/img/prd/488/v-638200526858384228/valentino-011305vl-1.webp'
  ],
  'inspirado-en-uomo-valentino': [
    'https://static.sweetcare.com/img/prd/488/v-638200526858852870/valentino-011305vl-2.webp',
    'https://static.sweetcare.com/img/prd/488/v-638200526858384228/valentino-011305vl-1.webp'
  ],
  'born-in-roma-men-valentino': [
    'https://disfragancias.com/cdn/shop/files/valentino.png?v=1725725723',
    'https://disfragancias.com/cdn/shop/files/Born-in-roma-2.jpg?v=1705179117'
  ],
  'inspirado-en-born-in-roma-men-valentino': [
    'https://disfragancias.com/cdn/shop/files/valentino.png?v=1725725723',
    'https://disfragancias.com/cdn/shop/files/Born-in-roma-2.jpg?v=1705179117'
  ],
  'tommy-men-tommy-hilfiger': [
    'https://agaval.vtexassets.com/arquivos/ids/2549878-800-800?v=638793742268400000&width=800&height=800&aspect=true',
    'https://agaval.vtexassets.com/arquivos/ids/2549877-800-800?v=638793742268270000&width=800&height=800&aspect=true'
  ],
  'inspirado-en-tommy-men-tommy-hilfiger': [
    'https://agaval.vtexassets.com/arquivos/ids/2549878-800-800?v=638793742268400000&width=800&height=800&aspect=true',
    'https://agaval.vtexassets.com/arquivos/ids/2549877-800-800?v=638793742268270000&width=800&height=800&aspect=true'
  ],
  'only-the-brave-tattoo-diesel': [
    'https://cdn.notinoimg.com/detail_main_hq/diesel/3605521534064_004/only-the-brave-tattoo___201201.jpg',
    'https://cdn.notinoimg.com/detail_main_hq/diesel/3605521534200_02n-o/only-the-brave-tattoo___200624.jpg'
  ],
  'inspirado-en-only-the-brave-tattoo-diesel': [
    'https://cdn.notinoimg.com/detail_main_hq/diesel/3605521534064_004/only-the-brave-tattoo___201201.jpg',
    'https://cdn.notinoimg.com/detail_main_hq/diesel/3605521534200_02n-o/only-the-brave-tattoo___200624.jpg'
  ],
  'santal-33-le-labo': [
    'https://disfragancias.com/cdn/shop/files/33.png?v=1725725947',
    'https://disfragancias.com/cdn/shop/files/Santal-33-2.jpg?v=1704489309'
  ],
  'inspirado-en-santal-33-le-labo': [
    'https://disfragancias.com/cdn/shop/files/33.png?v=1725725947',
    'https://disfragancias.com/cdn/shop/files/Santal-33-2.jpg?v=1704489309'
  ],
  'only-the-brave-diesel': [
    'https://static.sweetcare.com/img/prd/488/v-638362062582105245/diesel-005463ds-1.webp',
    'https://static.sweetcare.com/img/prd/488/v-638362062734938136/diesel-005463ds-2.webp'
  ],
  'inspirado-en-only-the-brave-diesel': [
    'https://static.sweetcare.com/img/prd/488/v-638362062582105245/diesel-005463ds-1.webp',
    'https://static.sweetcare.com/img/prd/488/v-638362062734938136/diesel-005463ds-2.webp'
  ],
  'uomo-intense-valentino': [
    'https://fimgs.net/photogram/p180/u7/90/8H5J4MwH6VtSaZiY.jpg',
    'https://www.zafiroperfumeria.com/wp-content/uploads/2024/07/Valentino-Uomo-Born-In-Roma-Intense.png'
  ],
  'inspirado-en-uomo-intense-valentino': [
    'https://fimgs.net/photogram/p180/u7/90/8H5J4MwH6VtSaZiY.jpg',
    'https://www.zafiroperfumeria.com/wp-content/uploads/2024/07/Valentino-Uomo-Born-In-Roma-Intense.png'
  ],
  'eros-energy-versace': [
    'https://glissperfumes.com/4875-large_default/eros-energy.jpg',
    'https://glissperfumes.com/3322-large_default/eros-energy.jpg'
  ],
  'inspirado-en-eros-energy-versace': [
    'https://glissperfumes.com/4875-large_default/eros-energy.jpg',
    'https://glissperfumes.com/3322-large_default/eros-energy.jpg'
  ],
  'eros-versace': [
    'https://facescr.vtexassets.com/arquivos/ids/202478-800-auto?v=638840390790070000&width=800&height=auto&aspect=true',
    'https://static.wixstatic.com/media/7e4077_b4bc66e09f6b41b5a2a2ea6511f39914~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/7e4077_b4bc66e09f6b41b5a2a2ea6511f39914~mv2.jpg'
  ],
  'inspirado-en-eros-versace': [
    'https://facescr.vtexassets.com/arquivos/ids/202478-800-auto?v=638840390790070000&width=800&height=auto&aspect=true',
    'https://static.wixstatic.com/media/7e4077_b4bc66e09f6b41b5a2a2ea6511f39914~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80,enc_avif,quality_auto/7e4077_b4bc66e09f6b41b5a2a2ea6511f39914~mv2.jpg'
  ],
  'eros-flame-versace': [
    'https://glissperfumes.com/4874-large_default/eros-flame.jpg',
    'https://glissperfumes.com/1831-large_default/eros-flame.jpg'
  ],
  'inspirado-en-eros-flame-versace': [
    'https://glissperfumes.com/4874-large_default/eros-flame.jpg',
    'https://glissperfumes.com/1831-large_default/eros-flame.jpg'
  ],
  'sauvage-dior': [
    'https://attoperfumes.com.co/cdn/shop/products/Perfume-Sauvage-De-Christian-Dior-Para-Hombre-eau-de-parfum-100ml.jpg?v=1669832520&width=713',
    'https://aromatica.cr/cdn/shop/files/Dior-Sauvage-Parfum-para-hombre-Aromatica-CR-421287.jpg?v=1727559352&width=600'
  ],
  'inspirado-en-sauvage-dior': [
    'https://attoperfumes.com.co/cdn/shop/products/Perfume-Sauvage-De-Christian-Dior-Para-Hombre-eau-de-parfum-100ml.jpg?v=1669832520&width=713',
    'https://aromatica.cr/cdn/shop/files/Dior-Sauvage-Parfum-para-hombre-Aromatica-CR-421287.jpg?v=1727559352&width=600'
  ],
  'aventus-creed': [
    'https://disfragancias.com/cdn/shop/files/Creed-aventus-600x600.jpg?v=1703994928',
    'https://perfulinio.com/wp-content/uploads/2022/11/PERFUME-EQUIVALENCIA-REPLICA-FEROMONAS-AVENTUS-CREED-100ML.jpg'
  ],
  'inspirado-en-aventus-creed': [
    'https://disfragancias.com/cdn/shop/files/Creed-aventus-600x600.jpg?v=1703994928',
    'https://perfulinio.com/wp-content/uploads/2022/11/PERFUME-EQUIVALENCIA-REPLICA-FEROMONAS-AVENTUS-CREED-100ML.jpg'
  ],
  'fahrenheit-dior': [
    'https://luxusmayorista.store/cdn/shop/files/DFHM-12095.png?v=1714256307&width=493',
    'https://aromatica.cr/cdn/shop/files/Dior-Fahrenheit-EDT-para-hombre-Aromatica-CR-424962.jpg?v=1727559791&width=600'
  ],
  'inspirado-en-fahrenheit-dior': [
    'https://luxusmayorista.store/cdn/shop/files/DFHM-12095.png?v=1714256307&width=493',
    'https://aromatica.cr/cdn/shop/files/Dior-Fahrenheit-EDT-para-hombre-Aromatica-CR-424962.jpg?v=1727559791&width=600'
  ],
  'sauvage-elixir-dior': [
    'https://disfragancias.com/cdn/shop/files/Sauvage-elixir-600x600.jpg?v=1703996369',
    'https://facescr.vtexassets.com/arquivos/ids/205242-1600-auto?v=638941577176470000&width=1600&height=auto&aspect=true'
  ],
  'inspirado-en-sauvage-elixir-dior': [
    'https://disfragancias.com/cdn/shop/files/Sauvage-elixir-600x600.jpg?v=1703996369',
    'https://facescr.vtexassets.com/arquivos/ids/205242-1600-auto?v=638941577176470000&width=1600&height=auto&aspect=true'
  ],
  'the-one-dolce-gabbana': [
    'https://perfumescolombia.com.co/cdn/shop/files/the-one-dolce-gabanna-100ml-edt-11-premium-6940760.png?crop=center&height=720&v=1751884098&width=720',
    'https://perfumescolombia.com.co/cdn/shop/files/the-one-dolce-gabanna-100ml-edt-11-premium-2936057.jpg?crop=center&height=720&v=1751884098&width=720'
  ],
  'inspirado-en-the-one-dolce-gabbana': [
    'https://perfumescolombia.com.co/cdn/shop/files/the-one-dolce-gabanna-100ml-edt-11-premium-6940760.png?crop=center&height=720&v=1751884098&width=720',
    'https://perfumescolombia.com.co/cdn/shop/files/the-one-dolce-gabanna-100ml-edt-11-premium-2936057.jpg?crop=center&height=720&v=1751884098&width=720'
  ],
  'light-blue-dolce-gabbana': [
    'https://www.zafiroperfumeria.com/wp-content/uploads/2019/07/DolceGabbana-Light-Blue-Perfumeria-Zafiro.jpg',
    'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/paris/122856999/variant/images/9cb732de-b72d-4c78-995c-889f99467276/122856999-0000-003.jpg'
  ],
  'inspirado-en-light-blue-dolce-gabbana': [
    'https://www.zafiroperfumeria.com/wp-content/uploads/2019/07/DolceGabbana-Light-Blue-Perfumeria-Zafiro.jpg',
    'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/paris/122856999/variant/images/9cb732de-b72d-4c78-995c-889f99467276/122856999-0000-003.jpg'
  ],
  'k-dolce-gabbana': [
    'https://static.wixstatic.com/media/7e4077_9f015b4b1ad445a8b27fa9de03d002fe~mv2.jpeg/v1/fill/w_500,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7e4077_9f015b4b1ad445a8b27fa9de03d002fe~mv2.jpeg',
    'https://http2.mlstatic.com/D_NQ_NP_2X_979186-MLU74127179244_012024-F.webp'
  ],
  'inspirado-en-k-dolce-gabbana': [
    'https://static.wixstatic.com/media/7e4077_9f015b4b1ad445a8b27fa9de03d002fe~mv2.jpeg/v1/fill/w_500,h_500,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7e4077_9f015b4b1ad445a8b27fa9de03d002fe~mv2.jpeg',
    'https://http2.mlstatic.com/D_NQ_NP_2X_979186-MLU74127179244_012024-F.webp'
  ],
  'inspirado-en-burberry-her-elixir': [
    'https://glissperfumes.com/5386-large_default/burberry-her-elixir-de-parfum.jpg',
    'https://glissperfumes.com/1613-large_default/burberry-her-elixir-de-parfum.jpg'
  ],
  'inspirado-en-burberry-her-elixir-burberry': [
    'https://glissperfumes.com/5386-large_default/burberry-her-elixir-de-parfum.jpg',
    'https://glissperfumes.com/1613-large_default/burberry-her-elixir-de-parfum.jpg'
  ],
  'inspirado-en-burberry-her-elixir-burberry-': [
    'https://glissperfumes.com/5386-large_default/burberry-her-elixir-de-parfum.jpg',
    'https://glissperfumes.com/1613-large_default/burberry-her-elixir-de-parfum.jpg'
  ],
  'inspirado-en-sweet-like-candy': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_966558-CBT84054786512_052025-F.webp',
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-sweet-like-candy-ariana-g-eau-de-parfum-100ml-mujer-3009480_1024x1024@2x.jpg?v=1758670069'
  ],
  'inspirado-en-sweet-like-candy-ariana-grande': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_966558-CBT84054786512_052025-F.webp',
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-sweet-like-candy-ariana-g-eau-de-parfum-100ml-mujer-3009480_1024x1024@2x.jpg?v=1758670069'
  ],
  'inspirado-en-sweet-like-candy-ariana-grande-': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_966558-CBT84054786512_052025-F.webp',
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-sweet-like-candy-ariana-g-eau-de-parfum-100ml-mujer-3009480_1024x1024@2x.jpg?v=1758670069'
  ],
  'inspirado-en-burberry-women': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Burberry-Classic-para-mujer-Lorens-flyer.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/12/Burberry-Classic-de-Burberry-para-Mujer-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'inspirado-en-burberry-women-burberry': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Burberry-Classic-para-mujer-Lorens-flyer.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/12/Burberry-Classic-de-Burberry-para-Mujer-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'inspirado-en-burberry-women-burberry-': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Burberry-Classic-para-mujer-Lorens-flyer.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/12/Burberry-Classic-de-Burberry-para-Mujer-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'inspirado-en-thank-u-next': [
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/hdc/ha2/9148671197214/prd-extra1-1237859_420x420/ariana-grande-thank-u-next-eau-de-parfum-spray-420x420.jpg',
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/h84/h91/8871828881438/zoom-side-1237859_420x420/ariana-grande-thank-u-next-eau-de-parfum-spray-420x420'
  ],
  'inspirado-en-thank-u-next-ariana-grande': [
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/hdc/ha2/9148671197214/prd-extra1-1237859_420x420/ariana-grande-thank-u-next-eau-de-parfum-spray-420x420.jpg',
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/h84/h91/8871828881438/zoom-side-1237859_420x420/ariana-grande-thank-u-next-eau-de-parfum-spray-420x420'
  ],
  'inspirado-en-thank-u-next-ariana-grande-': [
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/hdc/ha2/9148671197214/prd-extra1-1237859_420x420/ariana-grande-thank-u-next-eau-de-parfum-spray-420x420.jpg',
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/h84/h91/8871828881438/zoom-side-1237859_420x420/ariana-grande-thank-u-next-eau-de-parfum-spray-420x420'
  ],
  'inspirado-en-cloud': [
    'https://disfragancias.com/cdn/shop/files/cloud.png?v=1725721028',
    'https://disfragancias.com/cdn/shop/files/Cloud-2-600x600.jpg?v=1703975823'
  ],
  'inspirado-en-cloud-pink': [
    'https://arianagrandefragrances.com/cdn/shop/files/cloud-pink3.webp?v=1756329688',
    'https://perfumescolombia.com.co/cdn/shop/files/cloud-pink-ariana-grande-100ml-edp-11-premium-8034008.webp?crop=center&height=720&v=1751884092&width=720'
  ],
  'inspirado-en-burberry-her': [
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/h89/h30/9890588459038/prd-side-1228262_420x420/burberry-burberry-her-eau-de-parfum-spray-420x420.jpg',
    'https://mwhite.com.co/cdn/shop/files/burberry-her-dama-100-ml-perfumes-376.webp?v=1713427334&width=493'
  ]
};

const KEYWORD_IMAGE_MAP: Record<string, string[]> = {
  'inspirado en blue seduction': ['/images/external/blue-seduction-1.jpg', '/images/external/blue-seduction-2.jpg'],
  'blue seduction': ['/images/external/blue-seduction-1.jpg', '/images/external/blue-seduction-2.jpg'],
  'antonio banderas': ['/images/external/blue-seduction-2.jpg', '/images/external/blue-seduction-1.jpg'],
  'inspirado en caja (jean pascal)': ['/images/external/caja-1.png', '/images/external/caja-2.jpg'],
  'inspirado en caja jean pascal': ['/images/external/caja-1.png', '/images/external/caja-2.jpg'],
  'caja (jean pascal)': ['/images/external/caja-1.png', '/images/external/caja-2.jpg'],
  'caja jean pascal': ['/images/external/caja-1.png', '/images/external/caja-2.jpg'],
  'inspirado en cuero (jean pascal)': ['/images/external/cuero-1.jpg', '/images/external/cuero-2.jpg'],
  'inspirado en cuero jean pascal': ['/images/external/cuero-1.jpg', '/images/external/cuero-2.jpg'],
  'cuero (jean pascal)': ['/images/external/cuero-1.jpg', '/images/external/cuero-2.jpg'],
  'cuero jean pascal': ['/images/external/cuero-1.jpg', '/images/external/cuero-2.jpg'],
  'boss bottled': [
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-100ml-edp-11-premium-2483163.jpg?crop=center&height=720&v=1751884000&width=720',
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-100ml-edp-11-premium-4591083.png?crop=center&height=720&v=1751883999&width=720'
  ],
  'boss bottled night': [
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-night-100ml-edt-11-premium-7047199.png?crop=center&height=720&v=1751884148&width=720',
    'https://cdn.notinoimg.com/detail_main_hq/hugo-boss/737052352060_03/boss-bottled-night___250515.jpg'
  ],
  'boss bottled unlimited': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/12/Boss-Bottled-Unlimited-de-Hugo-Boss-para-Hombre-100ml-700x761.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Boss-Bottled-Unlimited-de-Hugo-Boss-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1'
  ],
  'sauvage': ['Diorsauvage.jpg'],
  'eros': ['versace-eros.jpg'],
  'invictus': ['pacorabanneinvictus.jpg'],
  'one million': ['paccorabanee-onemilion.jpg'],
  'polo red': ['ralphlaurenpolored.jpg'],
  'polo black': ['ralphlaurenpoloblack.jpg'],
  'polo blue': ['ralphlaurenpolosport.jpg'],
  'acqua di gio': ['giogioarmani-aquadigioblack.jpg'],
  'ck one': ['calvinkleinckone.jpg'],
  'calvin klein': ['calvinkleinckone.jpg'],
  'legend': ['montblanclegend.jpg'],
  'voyage': ['nautica-voyage.jpg'],
  'the one': ['dolceygabannatheone.jpg'],
  'light blue': ['dolceygabanalightblue.jpg'],
  'scandal': ['jeanpaulgaltierscandal.jpg'],
  'le male': ['Jeanpaulgaltierlemale.jpg'],
  'ultra male': ['jeanpaulgaltierultraamale.jpg'],
  'paris men': ['parishilton-parismen.jpg'],
  'tommy men': ['tomyhilfiger-tomymen.jpg'],
  'cloud': [
    'https://disfragancias.com/cdn/shop/files/cloud.png?v=1725721028',
    'https://disfragancias.com/cdn/shop/files/Cloud-2-600x600.jpg?v=1703975823'
  ],
  'sweet like candy': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_966558-CBT84054786512_052025-F.webp',
    'https://www.perfumesbogota.com.co/cdn/shop/products/perfume-sweet-like-candy-ariana-g-eau-de-parfum-100ml-mujer-3009480_1024x1024@2x.jpg?v=1758670069'
  ],
  'thank u next': [
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/hdc/ha2/9148671197214/prd-extra1-1237859_420x420/ariana-grande-thank-u-next-eau-de-parfum-spray-420x420.jpg',
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/h84/h91/8871828881438/zoom-side-1237859_420x420/ariana-grande-thank-u-next-eau-de-parfum-spray-420x420'
  ],
  'burberry her elixir': [
    'https://glissperfumes.com/5386-large_default/burberry-her-elixir-de-parfum.jpg',
    'https://glissperfumes.com/1613-large_default/burberry-her-elixir-de-parfum.jpg'
  ],
  'burberry women': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Burberry-Classic-para-mujer-Lorens-flyer.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/12/Burberry-Classic-de-Burberry-para-Mujer-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'burberry her': [
    'https://media.theperfumeshop.com/medias/sys_master/prd-images/h89/h30/9890588459038/prd-side-1228262_420x420/burberry-burberry-her-eau-de-parfum-spray-420x420.jpg',
    'https://mwhite.com.co/cdn/shop/files/burberry-her-dama-100-ml-perfumes-376.webp?v=1713427334&width=493'
  ],
  'omnia-crystaline-65ml-bvlgari': [
    'https://sensationsstore.com/cdn/shop/products/bvlgari-omnia-block-2-listing_1024x1024@2x.jpg?v=1588378315',
    'https://sensationsstore.com/cdn/shop/products/139880_1024x1024@2x.jpg?v=1588378320'
  ],
  'inspirado-en-omnia-crystaline-65ml-bvlgari': [
    'https://sensationsstore.com/cdn/shop/products/bvlgari-omnia-block-2-listing_1024x1024@2x.jpg?v=1588378315',
    'https://sensationsstore.com/cdn/shop/products/139880_1024x1024@2x.jpg?v=1588378320'
  ],
  'omnia-amethyste-65ml-bvlgari': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2023/09/0f1c8a0afee6f1fa156b08c06192ae9c.acordes-amethyste-3.jpg',
    'https://perfumerialusso.co/wp-content/uploads/2021/03/BVLGARI-OMNIA-AMAETHYSTE-65-ML-EDT.jpg'
  ],
  'inspirado-en-omnia-amethyste-65ml-bvlgari': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2023/09/0f1c8a0afee6f1fa156b08c06192ae9c.acordes-amethyste-3.jpg',
    'https://perfumerialusso.co/wp-content/uploads/2021/03/BVLGARI-OMNIA-AMAETHYSTE-65-ML-EDT.jpg'
  ],
  'omnia-coral-65ml-bvlgari': [
    'https://madeira.com.co/cdn/shop/files/783320420672_2.jpg?v=1723552936&width=720',
    'https://www.timeshopcolombia.com/images/stories/virtuemart/product/resized/omnia-coral-de-bvlgari-edt-65-ml-22-oz-para-mujer-perfumes-de-mujer7_250x250.jpg'
  ],
  'inspirado-en-omnia-coral-65ml-bvlgari': [
    'https://madeira.com.co/cdn/shop/files/783320420672_2.jpg?v=1723552936&width=720',
    'https://www.timeshopcolombia.com/images/stories/virtuemart/product/resized/omnia-coral-de-bvlgari-edt-65-ml-22-oz-para-mujer-perfumes-de-mujer7_250x250.jpg'
  ],
  'omnia-paraiba-65ml-bvlgari': [
    'https://luxuryandbeautybyfederica.com/cdn/shop/products/image_ba462f7f-6038-4ce9-864e-3ef637ba8ace_480x.jpg?v=1665570289',
    'https://pabangoph.com/cdn/shop/products/BvlgariOmniaParaiba-2.jpg?v=1610220056'
  ],
  'inspirado-en-omnia-paraiba-65ml-bvlgari': [
    'https://luxuryandbeautybyfederica.com/cdn/shop/products/image_ba462f7f-6038-4ce9-864e-3ef637ba8ace_480x.jpg?v=1665570289',
    'https://pabangoph.com/cdn/shop/products/BvlgariOmniaParaiba-2.jpg?v=1610220056'
  ],
  'omnia-coral-100ml-bvlgari': [
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/original/14853484-1735270685943590.jpg&format=webp&auto=avif&width=820&height=820&fit=cover',
    'https://i.ebayimg.com/images/g/T0IAAeSwiWFosyi7/s-l1600.webp'
  ],
  'inspirado-en-omnia-coral-100ml-bvlgari': [
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/original/14853484-1735270685943590.jpg&format=webp&auto=avif&width=820&height=820&fit=cover',
    'https://i.ebayimg.com/images/g/T0IAAeSwiWFosyi7/s-l1600.webp'
  ],
  'omnia-crystaline-100ml-bvlgari': [
    'https://dam.elcorteingles.es/producto/www-001013512365001-02.jpg?impolicy=Resize&width=967&height=1200',
    'https://attoperfumes.com.co/cdn/shop/files/Omnia-Crystalline_100-ml.jpg?v=1716332849&width=600'
  ],
  'inspirado-en-omnia-crystaline-100ml-bvlgari': [
    'https://dam.elcorteingles.es/producto/www-001013512365001-02.jpg?impolicy=Resize&width=967&height=1200',
    'https://attoperfumes.com.co/cdn/shop/files/Omnia-Crystalline_100-ml.jpg?v=1716332849&width=600'
  ],
  'omnia-amethyste-100ml-bvlgari': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2023/09/0f1c8a0afee6f1fa156b08c06192ae9c.acordes-amethyste-3.jpg',
    'https://fraganceroscolombia.com.co/wp-content/webp-express/webp-images/uploads/2024/09/BVLGARI-OMNIA-AMETHYSTE.jpeg.webp'
  ],
  'inspirado-en-omnia-amethyste-100ml-bvlgari': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2023/09/0f1c8a0afee6f1fa156b08c06192ae9c.acordes-amethyste-3.jpg',
    'https://fraganceroscolombia.com.co/wp-content/webp-express/webp-images/uploads/2024/09/BVLGARI-OMNIA-AMETHYSTE.jpeg.webp'
  ],
  'good-girl-fantastic-pink-carolina-herrera': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_811090-MLU54973197446_042023-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_835216-MLA93537944328_102025-F.webp'
  ],
  'inspirado-en-good-girl-fantastic-pink-carolina-herrera': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_811090-MLU54973197446_042023-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_835216-MLA93537944328_102025-F.webp'
  ],
  'good-girl-carolina-herrera': [
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/1600/1600/11833695-1214606674621180.jpg&format=webp&auto=avif&width=820&height=820&fit=cover',
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/original/11833695-2075172211422024.jpg&format=webp&auto=avif&width=820&height=820&fit=cover'
  ],
  'inspirado-en-good-girl-carolina-herrera': [
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/1600/1600/11833695-1214606674621180.jpg&format=webp&auto=avif&width=820&height=820&fit=cover',
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/original/11833695-2075172211422024.jpg&format=webp&auto=avif&width=820&height=820&fit=cover'
  ],
  'very-good-girl-carolina-herrera': [
    'https://media.glamour.es/photos/616f6f80bcde302b0cd80a64/master/w_1600,c_limit/732082.jpg',
    'https://medipielsa.vtexassets.com/arquivos/ids/194664-800-auto?v=638925879557400000&width=800&height=auto&aspect=true'
  ],
  'inspirado-en-very-good-girl-carolina-herrera': [
    'https://media.glamour.es/photos/616f6f80bcde302b0cd80a64/master/w_1600,c_limit/732082.jpg',
    'https://medipielsa.vtexassets.com/arquivos/ids/194664-800-auto?v=638925879557400000&width=800&height=auto&aspect=true'
  ],
  'good-girl-blush-carolina-herrera': [
    'https://mundoreloj.com.co/wp-content/uploads/2023/06/84110610567523.jpg.webp',
    'https://mundoreloj.com.co/wp-content/uploads/2023/06/8411061056752.jpg.webp'
  ],
  'inspirado-en-good-girl-blush-carolina-herrera': [
    'https://mundoreloj.com.co/wp-content/uploads/2023/06/84110610567523.jpg.webp',
    'https://mundoreloj.com.co/wp-content/uploads/2023/06/8411061056752.jpg.webp'
  ],
  'cloud pink': [
    'https://arianagrandefragrances.com/cdn/shop/files/cloud-pink3.webp?v=1756329688',
    'https://perfumescolombia.com.co/cdn/shop/files/cloud-pink-ariana-grande-100ml-edp-11-premium-8034008.webp?crop=center&height=720&v=1751884092&width=720'
  ],
  '360 men': ['perryelis-360men.jpg'],
  'swiss army': ['victorinox-swisarmy.jpg'],
  'hugo man': [
    'https://farina.com.bo/wp-content/uploads/2020/04/hugo-boss-hugo-man-arte.jpg',
    'https://static.beautytocare.com/cdn-cgi/image/width=1440,height=1200,f=auto/media/catalog/product//h/u/hugo-boss-hugo-man-eau-de-toilette-40ml_2.jpg'
  ],
  'hugo boss hugo man': [
    'https://farina.com.bo/wp-content/uploads/2020/04/hugo-boss-hugo-man-arte.jpg',
    'https://static.beautytocare.com/cdn-cgi/image/width=1440,height=1200,f=auto/media/catalog/product//h/u/hugo-boss-hugo-man-eau-de-toilette-40ml_2.jpg'
  ],
  'hugo red': [
    'https://farina.com.bo/wp-content/uploads/2020/04/hugo-boss-red-EDT-arte3.jpg',
    'https://www.fraganza.com.co/cdn/shop/products/20_hbeu58029708_999_21_7434a637-77c9-4be3-8a66-f0e3393e74e4_1024x1024@2x.jpg?v=1651439043'
  ],
  'hugo boss red': [
    'https://farina.com.bo/wp-content/uploads/2020/04/hugo-boss-red-EDT-arte3.jpg',
    'https://www.fraganza.com.co/cdn/shop/products/20_hbeu58029708_999_21_7434a637-77c9-4be3-8a66-f0e3393e74e4_1024x1024@2x.jpg?v=1651439043'
  ],
  'in motion': [
    'https://www.zafiroperfumeria.com/wp-content/uploads/2024/02/Boss-in-Motion-Hugo-Boss.png',
    'https://qurumperfumes.com/uploads/media/2023/boss_in_motion_1.JPEG'
  ],
  'boss in motion': [
    'https://www.zafiroperfumeria.com/wp-content/uploads/2024/02/Boss-in-Motion-Hugo-Boss.png',
    'https://qurumperfumes.com/uploads/media/2023/boss_in_motion_1.JPEG'
  ],
  'motion (hugo boss)': [
    'https://www.zafiroperfumeria.com/wp-content/uploads/2024/02/Boss-in-Motion-Hugo-Boss.png',
    'https://qurumperfumes.com/uploads/media/2023/boss_in_motion_1.JPEG'
  ],
  'the scent': [
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-the-scent-100ml-edt-11-premium-8244070.png?crop=center&height=720&v=1751884145&width=720',
    'https://perfugroupar.vtexassets.com/arquivos/ids/174562-800-auto?v=637891011720170000&width=800&height=auto&aspect=true'
  ],
  'dark blue': [
    'https://envioacasa.com.co/cdn/shop/files/Perfume_Hugo_Boss_Dark_Blue_EDT_envioacasa.co_envio_a_casa_2_0b44c3b7-05b2-4536-a265-54c9fbfa7bbe.jpg?v=1736182635&width=713',
    'https://aromatica.cr/cdn/shop/files/Decant-Hugo-Dark-Blue-para-hombre-Aromatica-CR-452989957.jpg?v=1751834677&width=600'
  ],
  'hugo boss dark blue': [
    'https://envioacasa.com.co/cdn/shop/files/Perfume_Hugo_Boss_Dark_Blue_EDT_envioacasa.co_envio_a_casa_2_0b44c3b7-05b2-4536-a265-54c9fbfa7bbe.jpg?v=1736182635&width=713',
    'https://aromatica.cr/cdn/shop/files/Decant-Hugo-Dark-Blue-para-hombre-Aromatica-CR-452989957.jpg?v=1751834677&width=600'
  ],
  'bottled night': [
    'https://perfumescolombia.com.co/cdn/shop/files/hugo-boss-bottled-night-100ml-edt-11-premium-7047199.png?crop=center&height=720&v=1751884148&width=720',
    'https://cdn.notinoimg.com/detail_main_hq/hugo-boss/737052352060_03/boss-bottled-night___250515.jpg'
  ],
  'bottled unlimited': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/12/Boss-Bottled-Unlimited-de-Hugo-Boss-para-Hombre-100ml-700x761.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Boss-Bottled-Unlimited-de-Hugo-Boss-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1'
  ],
  'bleu de chanel': ['chanelbleudchanel.jpg'],
  'allure': ['chanelalurehomesport.jpg'],
  'phantom': ['pacorabanephantom.jpg'],
  'black xs': ['pacorabaneblackXS.jpg'],
  'dior': ['Diorsauvage.jpg'],
  'versace': ['versace-eros.jpg'],
  'good girl - carolina herrera': [
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/1600/1600/11833695-1214606674621180.jpg&format=webp&auto=avif&width=820&height=820&fit=cover',
    'https://www.lookfantastic.com/images?url=https://static.thcdn.com/productimg/original/11833695-2075172211422024.jpg&format=webp&auto=avif&width=820&height=820&fit=cover'
  ],
  'very good girl - carolina herrera': [
    'https://media.glamour.es/photos/616f6f80bcde302b0cd80a64/master/w_1600,c_limit/732082.jpg',
    'https://medipielsa.vtexassets.com/arquivos/ids/194664-800-auto?v=638925879557400000&width=800&height=auto&aspect=true'
  ],
  'good girl blush - carolina herrera': [
    'https://mundoreloj.com.co/wp-content/uploads/2023/06/84110610567523.jpg.webp',
    'https://mundoreloj.com.co/wp-content/uploads/2023/06/8411061056752.jpg.webp'
  ],
  'good girl fantastic pink - carolina herrera': [
    'https://http2.mlstatic.com/D_NQ_NP_2X_811090-MLU54973197446_042023-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_835216-MLA93537944328_102025-F.webp'
  ],
  'inspirado en 212 heroes (carolina herrera)': [
    'https://facescr.vtexassets.com/arquivos/ids/173516-800-auto?v=637965603518430000&width=800&height=auto&aspect=true',
    'https://disfragancias.com/cdn/shop/files/Heroes-600x600.jpg?v=1703994177'
  ],
  '212 heroes (carolina herrera)': [
    'https://facescr.vtexassets.com/arquivos/ids/173516-800-auto?v=637965603518430000&width=800&height=auto&aspect=true',
    'https://disfragancias.com/cdn/shop/files/Heroes-600x600.jpg?v=1703994177'
  ],
  '212 heroes inspirado': [
    'https://facescr.vtexassets.com/arquivos/ids/173516-800-auto?v=637965603518430000&width=800&height=auto&aspect=true',
    'https://disfragancias.com/cdn/shop/files/Heroes-600x600.jpg?v=1703994177'
  ],
  'inspirado en 212 heroes': [
    'https://facescr.vtexassets.com/arquivos/ids/173516-800-auto?v=637965603518430000&width=800&height=auto&aspect=true',
    'https://disfragancias.com/cdn/shop/files/Heroes-600x600.jpg?v=1703994177'
  ],
  '212 men': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/11/1581.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/212-Men-NYC-de-Carolina-Herrera-para-hombre-flyer.jpg?strip=all&lossy=1&ssl=1'
  ],
  '212 vip men': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/11/1582.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/212-VIP-Men-de-Carolina-Herrera-para-hombre-flyer-2.jpg?strip=all&lossy=1&ssl=1'
  ],
  'inspirado en 212 vip rosé (carolina herrera)': [
    'https://facescr.vtexassets.com/arquivos/ids/186794-800-auto?v=638446517979030000&width=800&height=auto&aspect=true',
    'https://noirperfumeria.co/cdn/shop/files/212-vip-ROse-NP.webp?v=1682953708&width=713'
  ],
  'inspirado en 212 vip rosé': [
    'https://facescr.vtexassets.com/arquivos/ids/186794-800-auto?v=638446517979030000&width=800&height=auto&aspect=true',
    'https://noirperfumeria.co/cdn/shop/files/212-vip-ROse-NP.webp?v=1682953708&width=713'
  ],
  '212 vip rosé (carolina herrera)': [
    'https://facescr.vtexassets.com/arquivos/ids/186794-800-auto?v=638446517979030000&width=800&height=auto&aspect=true',
    'https://noirperfumeria.co/cdn/shop/files/212-vip-ROse-NP.webp?v=1682953708&width=713'
  ],
  '212 vip rosé': [
    'https://facescr.vtexassets.com/arquivos/ids/186794-800-auto?v=638446517979030000&width=800&height=auto&aspect=true',
    'https://noirperfumeria.co/cdn/shop/files/212-vip-ROse-NP.webp?v=1682953708&width=713'
  ],
  '212 vip': [
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2020/11/1582.jpg?strip=all&lossy=1&ssl=1',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/212-VIP-Men-de-Carolina-Herrera-para-hombre-flyer-2.jpg?strip=all&lossy=1&ssl=1'
  ],
  '212 vip men wild party': [
    'https://www.fraganza.com.co/cdn/shop/products/212-VIP-MEN-WILD-PARTY-DE-HERRERA-100-ML-HOMBRE-470x549_1024x1024@2x.jpg?v=1651439478',
    'https://www.cautivaperfumeria.com/cdn/shop/files/assets_task_01jx2wvdhsfv0b62wq780d7dwd_1749222867_img_1.webp?v=1750112702&width=600'
  ],
  '212 vip wild party': [
    'https://www.fraganza.com.co/cdn/shop/products/212-VIP-MEN-WILD-PARTY-DE-HERRERA-100-ML-HOMBRE-470x549_1024x1024@2x.jpg?v=1651439478',
    'https://www.cautivaperfumeria.com/cdn/shop/files/assets_task_01jx2wvdhsfv0b62wq780d7dwd_1749222867_img_1.webp?v=1750112702&width=600'
  ],
  'inspirado en 212 wild party': [
    'https://lemowoda.clubcore.com.co/Views/Front/img/webp/products/233-1646317084-1646317084.webp',
    'https://www.fraganza.com.co/cdn/shop/files/212WP27W_grande_1024x1024_2x_4ac8db5a-162b-4d44-a3a8-3e313a9323bd_1024x1024@2x.jpg?v=1747962090'
  ],
  '212 wild party (carolina herrera)': [
    'https://lemowoda.clubcore.com.co/Views/Front/img/webp/products/233-1646317084-1646317084.webp',
    'https://www.fraganza.com.co/cdn/shop/files/212WP27W_grande_1024x1024_2x_4ac8db5a-162b-4d44-a3a8-3e313a9323bd_1024x1024@2x.jpg?v=1747962090'
  ],
  '212 wild party mujer': [
    'https://lemowoda.clubcore.com.co/Views/Front/img/webp/products/233-1646317084-1646317084.webp',
    'https://www.fraganza.com.co/cdn/shop/files/212WP27W_grande_1024x1024_2x_4ac8db5a-162b-4d44-a3a8-3e313a9323bd_1024x1024@2x.jpg?v=1747962090'
  ],
  '212 sexy men': [
    'https://www.luksusimportedstore.com/cdn/shop/files/IMG-1262.jpg?v=1715468543&width=1445',
    'https://www.luksusimportedstore.com/cdn/shop/files/28B6D8C4-190F-4E30-A43B-B4D00CE16F2B.png?v=1715468543&width=1445'
  ],
  'inspirado en 212 vip wins': [
    'https://farina.com.bo/wp-content/uploads/2021/12/carolina-herrera-212-vip-wins-ad.jpg',
    'https://www.fraganza.com.co/cdn/shop/files/carolina-herrera-212-vip-wins-eau-de-parfum-80ml_1024x1024@2x.webp?v=1747962099'
  ],
  '212 vip wins (carolina herrera)': [
    'https://farina.com.bo/wp-content/uploads/2021/12/carolina-herrera-212-vip-wins-ad.jpg',
    'https://www.fraganza.com.co/cdn/shop/files/carolina-herrera-212-vip-wins-eau-de-parfum-80ml_1024x1024@2x.webp?v=1747962099'
  ],
  '212 vip wins mujer': [
    'https://farina.com.bo/wp-content/uploads/2021/12/carolina-herrera-212-vip-wins-ad.jpg',
    'https://www.fraganza.com.co/cdn/shop/files/carolina-herrera-212-vip-wins-eau-de-parfum-80ml_1024x1024@2x.webp?v=1747962099'
  ],
  '212 heroes': [
    'https://attoperfumes.com.co/cdn/shop/products/212HeroesHm.jpg?v=1649443295',
    'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/8411061974759_5.jpg?scale=500&qlty=75'
  ],
    '212 heroes hombres': [
      'https://attoperfumes.com.co/cdn/shop/products/212HeroesHm.jpg?v=1649443295',
      'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/8411061974759_5.jpg?scale=500&qlty=75'
    ],
  'inspirado en 212 nyc (carolina herrera mujer)': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2021/09/15e2bce6a84d4a9b1a9a01bbc38183ba.212-NYC-carolina-herrera-acordes-1.jpg',
    'https://perfumescolombia.com.co/cdn/shop/products/212-nyc-carolina-herrera-11-premium-1920455.png?crop=center&height=720&v=1751884213&width=720'
  ],
  'inspirado en 212 nyc mujer': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2021/09/15e2bce6a84d4a9b1a9a01bbc38183ba.212-NYC-carolina-herrera-acordes-1.jpg',
    'https://perfumescolombia.com.co/cdn/shop/products/212-nyc-carolina-herrera-11-premium-1920455.png?crop=center&height=720&v=1751884213&width=720'
  ],
  '212 nyc mujer': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2021/09/15e2bce6a84d4a9b1a9a01bbc38183ba.212-NYC-carolina-herrera-acordes-1.jpg',
    'https://perfumescolombia.com.co/cdn/shop/products/212-nyc-carolina-herrera-11-premium-1920455.png?crop=center&height=720&v=1751884213&width=720'
  ],
  '212 nyc femenino': [
    'https://cdn-khglf.nitrocdn.com/CWVvcOztbqQIesFhYcTHdQcMmGhozsWp/assets/images/optimized/rev-eaff09b/i0.wp.com/irisfragancias.com/wp-content/uploads/2021/09/15e2bce6a84d4a9b1a9a01bbc38183ba.212-NYC-carolina-herrera-acordes-1.jpg',
    'https://perfumescolombia.com.co/cdn/shop/products/212-nyc-carolina-herrera-11-premium-1920455.png?crop=center&height=720&v=1751884213&width=720'
  ],
  'bad boy': ['Carolinaherrerabadboyy.jpg'],
  'ariana grande': ['Arianagrande-cloud.jpg'],
  'burberry': ['burberry-burberryher.jpg'],
  'blv men': [
    'https://labelleperfumes.com/cdn/shop/files/blv-bulgari-home_1016x.webp?v=1711385698',
    'https://labelleperfumes.com/cdn/shop/files/blv-bulgari-home-ad_1016x.webp?v=1711385698'
  ],
  'bvlgari blv': [
    'https://labelleperfumes.com/cdn/shop/files/blv-bulgari-home_1016x.webp?v=1711385698',
    'https://labelleperfumes.com/cdn/shop/files/blv-bulgari-home-ad_1016x.webp?v=1711385698'
  ],
  'omnia': ['bvlgari-omniaamathyste100ml.jpg'],
  'dolce gabbana': ['dolceygabannatheone.jpg'],
  'eternity': ['calvinkleineternity.jpg'],
  'euphoria': ['calvinkleineuphoriamen.jpg'],
  'givenchy': ['givenchyblueelabel.jpg'],
  'creed': ['creedsventus.jpg'],
  'aventus': ['creedsventus.jpg'],
  'silver mountain': ['creedsilvermountain.jpg'],
  'fahrenheit': ['DiorFhrentein.jpg'],
  'elixir': ['diorsauvageelixir60ml.jpg'],
  'jean paul gaultier': ['jeanpaulgaltierscandal.jpg'],
  'le beau': ['jeanpaulgaltierlebeau.jpg'],
  'lacoste': ['lacostel12noir.jpg'],
  'l12 12': ['lacostel12noir.jpg'],
  'essential': ['lacosteessential.jpg'],
  'red lacoste': ['lacostered.jpg'],
  'mont blanc': ['montblanclegend.jpg'],
  'emblem': ['montblanc-emblem.jpg'],
  'perry ellis': ['perryelis-360men.jpg'],
  '360': ['perryelis-360men.jpg'],
  'ralph lauren': ['ralphlaurenpoloblack.jpg'],
  'tommy hilfiger': ['tomyhilfiger-tomymen.jpg'],
  'diesel': ['dieselonlythebravee.jpg'],
  'only the brave': ['dieselonlythebravee.jpg'],
  'le labo': ['LeLabo-santal33.jpg'],
  'santal 33': ['LeLabo-santal33.jpg'],
  'valentino': ['valentino-eros.jpg'],
  'born in roma': ['valentino-borninromamen.jpg'],
  'uomo': ['valentino-valentinoUomo.jpg'],
  'emporio armani': ['EmpoeioArmani-strongerwithyou.jpg'],
  'stronger with you': ['EmpoeioArmani-strongerwithyou.jpg'],
  'giorgio armani': ['giogioarmani-aquadigioblack.jpg'],
  'profumo': ['giogioarmani-aquadigioprofundo.jpg'],
  'profondo': ['giogioarmani-aquadigioprofundo.jpg'],
  'nautica': ['nautica-voyage.jpg'],
  'paris hilton': ['parishilton-parismen.jpg'],
  'moschino': ['emporioarmani.jpg'],
  'clinique': ['clinique-hapy.jpg'],
  'happy': ['clinique-hapy.jpg'],
  'aqva': [
    'https://perfumescardales.com.ar/wp-content/uploads/2020/01/bvlgari-aqva-marine-edt-1.jpg',
    'https://exdtvcqvfop.exactdn.com/wp-content/uploads/2015/06/Aqva-Pour-Homme-de-Bvlgari-de-hombre-100ml.jpg?strip=all&lossy=1&ssl=1'
  ],
  'victorinox': ['victorinox-swisarmy.jpg'],
  'issey miyake': ['isseymiyake-miyakemen.jpg']
};

const KEYWORD_IMAGE_ENTRIES = Object.entries(KEYWORD_IMAGE_MAP).sort((a, b) => b[0].length - a[0].length);

const normalizeKey = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getNormalizedKeys = (product: any): string[] => {
  const rawValues = [product.slug, product.id, product.visible_title, product.title]
    .filter(Boolean)
    .map((value: string) => normalizeKey(value));

  const normalizedSet = new Set<string>();
  const genre = (product.genre || '').toLowerCase();

  rawValues.forEach((key) => {
    if (!key) return;
    const trimmed = key.replace(/-+$/g, '');
    
    // Add base keys
    if (trimmed) {
      normalizedSet.add(trimmed);
    }
    normalizedSet.add(key);
    
    // Add gender-specific variants if genre is set
    if (genre.includes('woman') || genre.includes('mujer') || genre.includes('femenino')) {
      if (trimmed) {
        normalizedSet.add(`${trimmed}-mujer`);
      }
      normalizedSet.add(`${key}-mujer`);
    } else if (genre.includes('man') || genre.includes('hombre') || genre.includes('masculino')) {
      if (trimmed) {
        normalizedSet.add(`${trimmed}-hombre`);
      }
      normalizedSet.add(`${key}-hombre`);
    }
  });

  return Array.from(normalizedSet);
};

const findProductImages = (product: any): string[] | null => {
  const normalizedKeys = getNormalizedKeys(product);
  const categoryKey = product?.category ? normalizeKey(String(product.category)) : null;

  if (categoryKey) {
    for (const key of normalizedKeys) {
      const categorySpecificKey = `${key}-${categoryKey}`;
      const categoryPaths = PRODUCT_IMAGE_MAP[categorySpecificKey];
      if (categoryPaths && categoryPaths.length > 0) {
        return categoryPaths;
      }
    }
  }

  for (const key of normalizedKeys) {
    const paths = PRODUCT_IMAGE_MAP[key];
    if (paths && paths.length > 0) {
      return paths;
    }
  }

  return null;
};

const findInManifest = (product: any): string | null => {
  for (const key of getNormalizedKeys(product)) {
    if (catalogImageMap[key]) {
      return catalogImageMap[key];
    }
  }

  return null;
};

const resolveImagePath = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('data:image')) {
    return trimmed;
  }
  if (trimmed.startsWith('svg+xml')) {
    return `data:image/${trimmed}`;
  }
  if (trimmed.startsWith('http') || trimmed.startsWith('/')) {
    return trimmed;
  }
  return `/images/products/perfumes/${trimmed}`;
};

const collectKeywordMatches = (title: string): string[] => {
  const normalized = title.toLowerCase();
  const matches: string[] = [];

  for (const [keyword, paths] of KEYWORD_IMAGE_ENTRIES) {
    if (!normalized.includes(keyword)) {
      continue;
    }

    for (const path of paths) {
      if (matches.length >= MAX_GALLERY_IMAGES) break;
      const resolved = resolveImagePath(path);
      if (resolved && !matches.includes(resolved)) {
        matches.push(resolved);
      }
    }

    if (matches.length >= MAX_GALLERY_IMAGES) {
      break;
    }
  }

  return matches;
};

/**
 * Fallback images from multiple reliable sources
 * Used when primary source only has 1-2 images or URLs are broken
 */
const FALLBACK_IMAGES_MAP: Record<string, string[]> = {
  'boss-bottled-hugo-boss': [
    'https://cdn.shopify.com/s/files/1/0579/3740/6245/products/hugo-boss-bottled_1024x1024.jpg',
    'https://fragranceassets.com/images/bottled-standard.jpg',
  ],
  'boss-bottled-night-hugo-boss': [
    'https://cdn.shopify.com/s/files/1/0579/3740/6245/products/hugo-boss-bottled-night_1024x1024.jpg',
  ],
  'sauvage-dior': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/DIOR_SAUVAGE_EDT_200ML-01_400x.jpg',
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/DIOR_SAUVAGE_EDT_200ML-02_400x.jpg',
  ],
  'bleu-de-chanel-chanel': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/CHANEL_BLEU_EDT-01_400x.jpg',
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/CHANEL_BLEU_EDT-02_400x.jpg',
  ],
  'one-million-paco-rabanne': [
    'https://cdn.shopify.com/s/files/1/0579/3740/6245/products/paco-rabanne-one-million_1024x1024.jpg',
  ],
  'invictus-paco-rabanne': [
    'https://cdn.shopify.com/s/files/1/0579/3740/6245/products/paco-rabanne-invictus_1024x1024.jpg',
  ],
  'polo-red-ralph-lauren': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/POLO_RED_EDT-01_400x.jpg',
  ],
  'polo-blue-ralph-lauren': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/POLO_BLUE_EDT-01_400x.jpg',
  ],
  'acqua-di-gio-giorgio-armani': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/ACQUA_DI_GIO_EDT-01_400x.jpg',
  ],
  'eros-versace': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/VERSACE_EROS_EDT-01_400x.jpg',
  ],
  'le-male-jean-paul-gaultier': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/JPG_LE_MALE_EDT-01_400x.jpg',
  ],
  'aventus-creed': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/CREED_AVENTUS_EDT-01_400x.jpg',
  ],
  'the-one-dolce-gabbana': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/DG_THE_ONE_EDT-01_400x.jpg',
  ],
  'light-blue-dolce-gabbana': [
    'https://cdn.shopify.com/s/files/1/0098/9888/9117/products/DG_LIGHT_BLUE_EDT-01_400x.jpg',
  ],
};

/**
 * Get fallback images for a product if primary images are limited
 * Logic: Try new women/men maps first, then fall back to original map
 */
const getFallbackImagesForProduct = (product: any): string[] => {
  const normalizedKeys = getNormalizedKeys(product);
  const genre = (product.genre || '').toLowerCase();
  
  // 1. If product is explicitly WOMAN, search women's map first
  if (genre.includes('woman') || genre.includes('mujer') || genre.includes('femenino')) {
    for (const key of normalizedKeys) {
      const womenImages = WOMEN_PERFUME_IMAGES_MAP[key as keyof typeof WOMEN_PERFUME_IMAGES_MAP];
      if (womenImages && womenImages.length > 0) {
        return womenImages;
      }
    }
  }
  
  // 2. If product is explicitly MAN, search men's map first
  if (genre.includes('man') || genre.includes('hombre') || genre.includes('masculino')) {
    for (const key of normalizedKeys) {
      const menImages = MEN_PERFUME_IMAGES_MAP[key as keyof typeof MEN_PERFUME_IMAGES_MAP];
      if (menImages && menImages.length > 0) {
        return menImages;
      }
    }
  }
  
  // 3. Always fall back to original map (this is the safety net)
  for (const key of normalizedKeys) {
    const fallbackImages = FALLBACK_IMAGES_MAP[key];
    if (fallbackImages && fallbackImages.length > 0) {
      return fallbackImages;
    }
  }
  
  return [];
};

const addToCollection = (collection: string[], value: string | null | undefined) => {
  if (collection.length >= MAX_GALLERY_IMAGES) return;
  const resolved = resolveImagePath(value);
  if (resolved && !collection.includes(resolved)) {
    collection.push(resolved);
  }
};

export function getProductImageGallery(product: any): string[] {
  const images: string[] = [];
  const title = product.visible_title || product.title || product.name || '';

  // 1. Try product-specific images first
  const productSpecificImages = findProductImages(product);
  if (productSpecificImages) {
    productSpecificImages.forEach((match) => addToCollection(images, match));
  }

  // 2. Try keyword matches from title
  collectKeywordMatches(title).forEach((match) => addToCollection(images, match));

  // 3. Try manifest/catalog images
  const manifestImage = findInManifest(product);
  addToCollection(images, manifestImage);

  // 4. Add product's own images
  addToCollection(images, product.image_url);

  if (Array.isArray(product.images)) {
    product.images.forEach((image: string) => addToCollection(images, image));
  }

  // 5. If we have fewer than MAX_GALLERY_IMAGES, use fallback images from reliable sources
  if (images.length < MAX_GALLERY_IMAGES) {
    const fallbackImages = getFallbackImagesForProduct(product);
    fallbackImages.forEach((fallback) => addToCollection(images, fallback));
  }

  // 6. If still empty, try kit references
  const kitCandidate = product.visible_title || product.title || '';
  if (images.length === 0 && kitCandidate && isKitReference(kitCandidate)) {
    addToCollection(images, getKitImagePath(kitCandidate));
  }

  // 7. Final fallback: placeholder
  if (images.length === 0) {
    addToCollection(images, getKitPlaceholderImage(title || 'SEVÁN PERFUM'));
  }

  return images;
}

// Función para obtener la imagen principal del producto
export function getProductImageUrl(product: any): string {
  const gallery = getProductImageGallery(product);
  return gallery[0] ?? FALLBACK_IMAGE;
}

export default getProductImageUrl;