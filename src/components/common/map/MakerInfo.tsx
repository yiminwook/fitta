import { KakaoMapMarkerType } from '@/types/kakaoMap';
import map from '@/components/common/map/Map.module.scss';
import { memo, MouseEvent } from 'react';

interface MakerInfoProps {
  info: KakaoMapMarkerType;
}

const MarkerInfo = ({ info }: MakerInfoProps) => {
  const { content, position } = info;

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    const href = `https://map.kakao.com/link/map/${content},${position.lat},${position.lng}`;
    window.open(href);
  };

  return (
    <div className={map['mapInfo']} onClick={onClick}>
      {content}
    </div>
  );
};

export default memo(MarkerInfo);
