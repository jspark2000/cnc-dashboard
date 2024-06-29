import { CNCData } from '../../../utils/cncData'

const LabelItem = ({ title, text }: { title: string; text: string }) => (
  <div className="flex h-16 flex-col items-center justify-center border border-gray-400 p-2">
    <div className="mb-2 text-sm font-bold">{title}</div>
    <div className="text-xs font-bold">{text}</div>
  </div>
)

const Labels = ({ data }: { data: CNCData }) => {
  const labels = [
    { title: 'Spindle RPM', text: String(data?.spindlerpm ?? '') },
    { title: 'Current Feed Rate', text: String(data?.currentfeadrate ?? '') },
    { title: 'Spindle Load', text: String(data?.spindleload ?? '') },
    { title: 'X-Axis', text: String(data?.xaxis ?? '') },
    { title: 'Z-Axis', text: String(data?.zaaxis ?? '') },
    { title: 'Tool Group ID', text: String(data?.toolgroupid ?? '') },
    { title: 'Tool Life Counter', text: String(data?.toollifecounter ?? '') },
    { title: 'Part Counter', text: String(data?.partcounter ?? '') },
    { title: 'Power On Time', text: String(data?.powerontime ?? '') },
    { title: 'Operation Time', text: String(data?.operationtime ?? '') },
    { title: 'Cut Time', text: String(data?.cuttime ?? '') },
    { title: 'Cycle Time', text: String(data?.cycletime ?? '') },
    { title: 'Alarm 0', text: String(data?.alarm0 ?? '') },
    { title: 'Alarm 1', text: String(data?.alarm1 ?? '') },
    { title: 'Alarm 2', text: String(data?.alarm2 ?? '') },
    { title: 'Alarm 3', text: String(data?.alarm3 ?? '') },
    { title: 'Alarm 4', text: String(data?.alarm4 ?? '') },
    { title: 'Alarm 5', text: String(data?.alarm5 ?? '') },
    { title: 'Alarm 6', text: String(data?.alarm6 ?? '') },
    { title: 'Alarm 7', text: String(data?.alarm7 ?? '') },
    { title: 'Alarm 8', text: String(data?.alarm8 ?? '') },
    { title: 'Alarm 9', text: String(data?.alarm9 ?? '') },
    { title: 'Alarm 10', text: String(data?.alarm10 ?? '') },
    { title: 'Alarm 11', text: String(data?.alarm11 ?? '') },
    { title: 'Alarm 12', text: String(data?.alarm12 ?? '') },
    { title: 'Alarm 13', text: String(data?.alarm13 ?? '') },
    { title: 'Alarm 14', text: String(data?.alarm14 ?? '') },
    { title: 'Axes No', text: String(data?.axesno ?? '') },
    { title: 'On Off', text: String(data?.onoff ?? '') },
    { title: 'NC Program No', text: String(data?.ncprogno ?? '') },
    { title: 'NC Main Program No', text: String(data?.ncmainprogno ?? '') },
    { title: 'Spindle No', text: String(data?.spindleno ?? '') },
    { title: 'Operation Mode', text: String(data?.operationmode ?? '') },
    { title: 'Servo Current 1', text: String(data?.servocurrent1 ?? '') },
    { title: 'Servo Current 2', text: String(data?.servocurrent2 ?? '') },
    { title: 'Servo Current 3', text: String(data?.servocurrent3 ?? '') },
    { title: 'Servo Current 4', text: String(data?.servocurrent4 ?? '') },
    { title: 'Servo Current 5', text: String(data?.servocurrent5 ?? '') },
    {
      title: 'Servo Motor Speed 1',
      text: String(data?.servomotorspeed1 ?? '')
    },
    {
      title: 'Servo Motor Speed 2',
      text: String(data?.servomotorspeed2 ?? '')
    },
    {
      title: 'Servo Motor Speed 3',
      text: String(data?.servomotorspeed3 ?? '')
    },
    {
      title: 'Servo Motor Speed 4',
      text: String(data?.servomotorspeed4 ?? '')
    },
    {
      title: 'Servo Motor Speed 5',
      text: String(data?.servomotorspeed5 ?? '')
    },
    { title: 'Temp', text: String(data?.temp ?? '') },
    { title: 'Gcode Group No', text: String(data?.gcodegroupno ?? '') },
    { title: 'Gcode Flag', text: String(data?.gcodeflag ?? '') },
    { title: 'Gcode', text: String(data?.gcode ?? '') }
  ]

  return (
    <div className="mb-12 grid border-collapse grid-cols-8 gap-0">
      {labels.map((label, index) => (
        <LabelItem key={index} title={label.title} text={label.text} />
      ))}
    </div>
  )
}

export default Labels
