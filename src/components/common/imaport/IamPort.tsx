import { envConfig } from '@/configs';
import { RequestPayResponseCallback } from '@/types/iamport';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const { REACT_APP_IAMPORT_IMP_CODE, REACT_APP_SITE_URL } = envConfig();

const IamPort = () => {
  const [load, setLoad] = useState(0);
  const onLoad = () => {
    console.log('로드');
    setLoad((pre) => pre + 1);
  };

  useEffect(() => {
    const jQuery = document.createElement('script');
    jQuery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    jQuery.defer = true;
    jQuery.addEventListener('load', onLoad);

    const iamPort = document.createElement('script');
    iamPort.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
    iamPort.defer = true;
    iamPort.addEventListener('load', onLoad);

    document.head.appendChild(jQuery);
    document.head.appendChild(iamPort);

    return () => {
      document.head.removeChild(jQuery);
      document.head.removeChild(iamPort);
    };
  }, []);

  const callback: RequestPayResponseCallback = (response) => {
    const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status } = response;

    if (success) {
      toast.success('성공');
    } else {
      toast.error(error_msg);
    }

    console.log('결재정보', response);
  };

  const onClick = () => {
    const { IMP } = window;
    if (!IMP) return;
    IMP.init(REACT_APP_IAMPORT_IMP_CODE);
    const data = {
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: `schedule_${Date.now()}`,
      name: '6월 이용권',
      amount: 100,
      buyer_email: 'gildong@gmail.com',
      buyer_name: '홍길동',
      buyer_tel: '010-4242-4242',
      buyer_addr: '서울특별시 강남구 신사동',
      buyer_postcode: '01181',
      m_redirect_url: REACT_APP_SITE_URL,
    };
    //redirect_url?imp_uid&imp_success&merchant_uid
    console.log(IMP.request_pay);
    IMP.request_pay(data, callback);
  };

  if (load < 2) return <div>로드중!!</div>;

  return (
    <div>
      로드완료
      <button onClick={onClick}>결재</button>
    </div>
  );
};

export default IamPort;
