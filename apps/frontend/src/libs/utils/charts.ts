export const CHART_COLORS = {
  blue: '#2196F3', // 밝은 파랑
  red: '#F44336', // 밝은 빨강
  green: '#4CAF50', // 초록
  purple: '#9C27B0', // 보라
  orange: '#FF9800', // 주황
  teal: '#009688', // 청록
  pink: '#E91E63', // 분홍
  indigo: '#3F51B5', // 인디고
  brown: '#795548', // 갈색
  lime: '#CDDC39', // 라임
  cyan: '#00BCD4', // 시안
  amber: '#FFC107', // 황색
  deepPurple: '#673AB7', // 진보라
  lightBlue: '#03A9F4', // 하늘색
  deepOrange: '#FF5722', // 진주황
  lightGreen: '#8BC34A', // 연두
  blueGrey: '#607D8B', // 블루그레이
  yellow: '#FFEB3B', // 노랑
  darkBlue: '#1A237E', // 진파랑
  rose: '#FF4081' // 장미색
}

export const CHART_COLOR_ARRAY = Object.values(CHART_COLORS)

export const getChartColor = (index: number): string => {
  return CHART_COLOR_ARRAY[index % CHART_COLOR_ARRAY.length]
}
