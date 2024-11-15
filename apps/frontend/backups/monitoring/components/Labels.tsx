import { CNCData } from '../../../libs/utils/cncData'

const LabelItem = ({ title, text }: { title: string; text: string }) => (
  <div className="flex h-12 flex-col items-center justify-center border-b border-l border-gray-400 p-2">
    <div className="mb-1 text-xs font-medium">{title}</div>
    <div className="text-xs font-normal">{text}</div>
  </div>
)

const LabelTitle = ({ title }: { title: string }) => (
  <div className="w-full bg-gray-400 py-1 text-center text-sm font-bold text-white">
    {title}
  </div>
)

const Labels = ({ data }: { data: CNCData }) => {
  const monitoringLabels = [
    { title: 'Spindle RPM', text: String(data?.spindlerpm ?? '') },
    { title: 'Current Feed Rate', text: String(data?.currentfeadrate ?? '') },
    { title: 'Spindle Load', text: String(data?.spindleload ?? '') },
    { title: 'Spindle No', text: String(data?.spindleno ?? '') },
    { title: 'Tool Group ID', text: String(data?.toolgroupid ?? '') },
    { title: 'Tool Life Counter', text: String(data?.toollifecounter ?? '') }
  ]

  const positionLabels = [
    { title: 'X-Axis', text: String(data?.xaxis ?? '') },
    { title: 'Z-Axis', text: String(data?.zaaxis ?? '') }
  ]

  const programLabels = [
    { title: 'NC Program No', text: String(data?.ncprogno ?? '') },
    { title: 'NC Main Program No', text: String(data?.ncmainprogno ?? '') },
    { title: 'Operation Mode', text: String(data?.operationmode ?? '') },
    { title: 'Gcode Group No', text: String(data?.gcodegroupno ?? '') },
    { title: 'Gcode Flag', text: String(data?.gcodeflag ?? '') },
    { title: 'Gcode', text: String(data?.gcode ?? '') }
  ]

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
    // { title: 'Alarm 0', text: String(data?.alarm0 ?? '') },
    // { title: 'Alarm 1', text: String(data?.alarm1 ?? '') },
    // { title: 'Alarm 2', text: String(data?.alarm2 ?? '') },
    // { title: 'Alarm 3', text: String(data?.alarm3 ?? '') },
    // { title: 'Alarm 4', text: String(data?.alarm4 ?? '') },
    // { title: 'Alarm 5', text: String(data?.alarm5 ?? '') },
    // { title: 'Alarm 6', text: String(data?.alarm6 ?? '') },
    // { title: 'Alarm 7', text: String(data?.alarm7 ?? '') },
    // { title: 'Alarm 8', text: String(data?.alarm8 ?? '') },
    // { title: 'Alarm 9', text: String(data?.alarm9 ?? '') },
    // { title: 'Alarm 10', text: String(data?.alarm10 ?? '') },
    // { title: 'Alarm 11', text: String(data?.alarm11 ?? '') },
    // { title: 'Alarm 12', text: String(data?.alarm12 ?? '') },
    // { title: 'Alarm 13', text: String(data?.alarm13 ?? '') },
    // { title: 'Alarm 14', text: String(data?.alarm14 ?? '') },
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
    <div className="mb-8 flex w-full border-r border-gray-400">
      <div className="flex w-1/3 flex-col">
        <LabelTitle title="MONITORING" />
        <div className="grid border-collapse grid-cols-3 gap-0">
          {monitoringLabels.map((label, index) => (
            <LabelItem key={index} title={label.title} text={label.text} />
          ))}
        </div>
      </div>
      <div className="flex w-1/3 flex-col">
        {/* <div className='w-full text-center font-bold text-sm py-1 bg-gray-400 text-white'>
          POSITION
        </div> */}
        <LabelTitle title="POSITION" />
        <div className="grid border-collapse grid-cols-3 gap-0">
          {positionLabels.map((label, index) => (
            <LabelItem key={index} title={label.title} text={label.text} />
          ))}
          <LabelItem title={''} text={''}></LabelItem>
          <LabelItem title={''} text={''}></LabelItem>
          <LabelItem title={''} text={''}></LabelItem>
          <LabelItem title={''} text={''}></LabelItem>
        </div>
      </div>
      <div className="flex w-1/3 flex-col">
        <LabelTitle title="PROGRAM" />
        <div className="grid border-collapse grid-cols-3 gap-0">
          {programLabels.map((label, index) => (
            <LabelItem key={index} title={label.title} text={label.text} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Labels
