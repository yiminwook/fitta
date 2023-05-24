import { envConfig } from '@/configs';
import { KakaoMapMarkerType } from '@/types/kakaoMap';
import { CSSProperties, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MarkerInfo from '@/components/common/map/MakerInfo';

const { REACT_APP_KAKAO_JAVASCRIPT_KEY } = envConfig();

interface RenderMapByAddress {
  gymName: string;
  address: string;
  style: CSSProperties;
}

/**
 * @params gymName: string ex) **휘트니스,
 * @params address: string ex) 도로명주소 + 상세주소,
 * @params style: { width, height } 필수,
 */
const RenderMapByAddress = ({ gymName, address, style }: RenderMapByAddress) => {
  const [isLoad, setIsLoad] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [marker, setMarker] = useState<KakaoMapMarkerType | null>(null);
  const [info, setInfo] = useState<KakaoMapMarkerType>();

  useEffect(() => {
    const script = document.createElement('script');
    // https://apis.map.kakao.com/web/guide/#whatlibrary
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${REACT_APP_KAKAO_JAVASCRIPT_KEY}&libraries=services`;
    script.defer = true;
    script.addEventListener('load', () => setIsLoad(() => true)); //kakao map script가 load된 뒤에 실행
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!(map && isLoad)) return;
    /** service libraries 사용 */
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        const lat = Number(y);
        const lng = Number(x);

        // Marker를 셋팅
        setMarker(() => ({
          content: gymName,
          position: { lat, lng },
        }));

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(new kakao.maps.LatLng(lat, lng));
      }
    });
  }, [map, isLoad]);

  return (
    <div>
      {isLoad ? (
        <Map
          center={{
            lat: 37.566826,
            lng: 126.9786567,
          }}
          style={{ ...style }}
          level={1}
          onCreate={(map) => setMap(map)}
        >
          {marker ? (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => {
                const href = `https://map.kakao.com/link/map/${marker.content},${marker.position.lat},${marker.position.lng}`;
                window.open(href);
              }}
              onCreate={() => {
                setInfo(marker);
              }}
            >
              {info ? <MarkerInfo info={info} /> : null}
            </MapMarker>
          ) : null}
        </Map>
      ) : null}
    </div>
  );
};

export default RenderMapByAddress;
