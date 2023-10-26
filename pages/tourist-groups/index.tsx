import { GetServerSideProps } from 'next';
import { FooterBlock } from '../../components/FooterBlock';
import { Meta } from '../../components/Meta';
import { Toolbar } from '../../components/Toolbar';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useMemo } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { improve } from '@cloudinary/url-gen/actions/adjust';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { crop } from '@cloudinary/url-gen/actions/resize';
import { ar1X1 } from '@cloudinary/url-gen/qualifiers/aspectRatio';

const prepareImage = (publicId: string, cdn: Cloudinary) => cdn.image(publicId)
  .adjust(improve().mode('indoor'))
  .delivery(quality(auto()))
  .delivery(format(auto()))
  .roundCorners(byRadius(10)).resize(
    crop()
      .aspectRatio(ar1X1()));

export default function TouristGroups() {
  const { t } = useTranslation();

  
  const cdn = useMemo(() => {
    return new Cloudinary({
      cloud: {
        cloudName: process.env.cdnName,
      }
    });
  }, []);

  const set1 = useMemo(() => prepareImage('tourist-group-set-1', cdn), [cdn]);

  const set2 = useMemo(() => prepareImage('tourist-group-set-2', cdn), [cdn]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    document.body.scroll({ top: 0 });

  }, []);
  return (
    <>
      <Meta description={'Taiwaya: ' + t('tourist-groups.title')} />
      <Toolbar />
      <div className="body-container">
        <main className="content-container main-page__content">
          <div className="content-block">


          </div>
          <div className="content-block">
            <div className="content-block__title">
              <h2>{t('tourist-groups.title')}</h2>

            </div>
            <div className="">
              <div className="content-block__content-text"  dangerouslySetInnerHTML={{__html: t('tourist-groups.offer')}}>
                
              </div>
            </div>
            </div>
            
          <div className="content-block">

            <div className="content-block__content">

              <div className="content-block__content-text" dangerouslySetInnerHTML={{__html: t('tourist-groups.set1')}}>
              </div>
              <div className="content-block__content-image-container">
                <AdvancedImage className="content-block__content-image" cldImg={set1} plugins={[lazyload(), placeholder({ mode: 'blur' })]} />
              </div>
            </div>
            </div>
          <div className="content-block">

            <div className="content-block__content">
            <div className="content-block__content-image-container">
                <AdvancedImage className="content-block__content-image" cldImg={set2} plugins={[lazyload(), placeholder({ mode: 'blur' })]} />
              </div>
              <div className="content-block__content-text" dangerouslySetInnerHTML={{__html: t('tourist-groups.set2')}}>
              </div>
            </div>
          </div>
        </main >
        <FooterBlock />
      </div >
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const translations = await serverSideTranslations(locale, ['common']);

  return {
    props: {
      ...translations,
    }
  };
};
