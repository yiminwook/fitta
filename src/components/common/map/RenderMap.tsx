import gym from '@/components/gym/Gym.module.scss';
import { envConfig } from '@/configs';
import { KakaoMapMarkerType } from '@/types/kakaoMap';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const { REACT_APP_KAKAO_JAVASCRIPT_KEY } = envConfig();

const RenderMap = () => {
  const [info, setInfo] = useState<any>();
  const [isLoad, setIsLoad] = useState(false);
  const [markers, setMarkers] = useState<KakaoMapMarkerType[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();

  useEffect(() => {
    const script = document.createElement('script');
    // https://apis.map.kakao.com/web/guide/#whatlibrary
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${REACT_APP_KAKAO_JAVASCRIPT_KEY}`;
    script.defer = true;
    script.addEventListener('load', () => setIsLoad(() => true));
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      {isLoad ? (
        <Map // 로드뷰를 표시할 Container
          center={{
            lat: 37.566826,
            lng: 126.9786567,
          }}
          style={{
            width: '100%',
            height: '350px',
          }}
          level={5}
          onCreate={(map) => setMap(map)}
        >
          {markers.map((marker: any) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
            </MapMarker>
          ))}
        </Map>
      ) : null}
    </div>
  );
};

export default RenderMap;
