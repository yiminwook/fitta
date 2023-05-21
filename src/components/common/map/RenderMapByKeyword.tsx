import { envConfig } from '@/configs';
import { KakaoMapMarkerType } from '@/types/kakaoMap';
import { CSSProperties, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MarkerInfo from '@/components/common/map/MakerInfo';
import map from '@/components/common/map/Map.module.scss';

const { REACT_APP_KAKAO_JAVASCRIPT_KEY } = envConfig();

interface RenderMapByKeywordProps {
  keyword: string;
  style: CSSProperties;
}
/**
 * @params keyword: string ex) **구 헬스장,
 * @params style: { width, height } 필수,
 */
const RenderMapByKeyword = ({ keyword, style }: RenderMapByKeywordProps) => {
  const [isLoad, setIsLoad] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers, setMarkers] = useState<KakaoMapMarkerType[]>([]);
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
    const places = new kakao.maps.services.Places();

    places.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers: KakaoMapMarkerType[] = [];
        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: Number(data[i].y),
              lng: Number(data[i].x),
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
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
          level={3}
          onCreate={(map) => setMap(map)}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info ? <MarkerInfo info={info} /> : null}
            </MapMarker>
          ))}
        </Map>
      ) : null}
    </div>
  );
};

export default RenderMapByKeyword;
