import graph from '@/components/common/graph/Graph.module.scss';
import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';

export interface ChartData {
  percentage: number;
}

interface DonutGraphProps {
  style?: CSSProperties;
  fontSize?: string;
  data: ChartData;
  hexColor: string;
}

const DonutGraph = ({ style, fontSize = '1rem', data, hexColor }: DonutGraphProps) => {
  const [percentage, setPercentage] = useState(0);

  const roundGraphAnimation = useCallback(() => {
    if (percentage === data.percentage) return;
    setPercentage((pre) => pre + 1);
  }, [percentage]);

  /** 0 ~ 360deg */
  const degree = useMemo(() => (360 * percentage) / 100, [percentage]);

  useEffect(() => {
    if (percentage === data.percentage) return;
    const animation = setInterval(roundGraphAnimation, 5);
    return () => clearInterval(animation);
  }, [percentage]);

  return (
    <div className={graph['donutGraph']} style={{ ...style }}>
      <div className={graph['percentage']} style={{ fontSize }}>
        {percentage}
      </div>
      <div
        className={graph['chartBar']}
        style={{
          background: `conic-gradient(${hexColor} ${degree}deg, transparent ${degree}deg)`,
        }}
      />
    </div>
  );
};

export default DonutGraph;
