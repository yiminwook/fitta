type MakerPositionType = {
  lat: number;
  lng: number;
};

export interface KakaoMapMarkerType {
  position: MakerPositionType;
  content: string;
}
