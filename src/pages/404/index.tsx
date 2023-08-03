import React, { ReactElement } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { HOME } from '@/constants/routes.constant';
import styles from '../../styles/modules/404.module.scss';

const NotFoundPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleBack = () => {
    router.push(HOME);
  };

  return (
    <div className={styles.container}>
      <div className={styles.fluid}>
        <h1>404</h1>
        <div>{t('text.page_not_found')}</div>
        <Button type="primary" onClick={handleBack}>
          {t('text.back')}
        </Button>
      </div>
    </div>
  );
};

NotFoundPage.getLayout = function PageLayout(page: ReactElement) {
  return <div>{page}</div>;
};

export default NotFoundPage;
