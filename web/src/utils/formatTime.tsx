
export function formatTime(input: string): string {
  // 입력 문자열을 Date 객체로 변환
  const date = new Date(input);

  // 분과 초를 추출
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const day = date.getDate();

  // 두 자리 숫자로 맞춤
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  // 원하는 형식으로 변환
  return `${date.getMonth() + 1}/${formattedDay} ${date.getHours()}:${formattedMinutes}:${formattedSeconds}`;
}