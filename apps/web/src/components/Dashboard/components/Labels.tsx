import styled from 'styled-components'
import { CNCData } from '../../../utils/cncData'

const Labels = ({ data }: { data: CNCData }) => {
  // console.log(data);
  return (
    <LabelContainer>
      <LabelItem>
        <LabelTitle>Spindle RPM</LabelTitle>
        <LabelText>{data?.spindlerpm}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Current Feed Rate</LabelTitle>
        <LabelText>{data?.currentfeadrate}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Spindle Load</LabelTitle>
        <LabelText>{data?.spindleload}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>X-Axis</LabelTitle>
        <LabelText>{data?.xaxis}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Z-Axis</LabelTitle>
        <LabelText>{data?.zaaxis}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Tool Group ID</LabelTitle>
        <LabelText>{data?.toolgroupid}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Tool Life Counter</LabelTitle>
        <LabelText>{data?.toollifecounter}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Part Counter</LabelTitle>
        <LabelText>{data?.partcounter}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Power On Time</LabelTitle>
        <LabelText>{data?.powerontime}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Operation Time</LabelTitle>
        <LabelText>{data?.operationtime}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Cut Time</LabelTitle>
        <LabelText>{data?.cuttime}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Cycle Time</LabelTitle>
        <LabelText>{data?.cycletime}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 0</LabelTitle>
        <LabelText>{data?.alarm0}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 1</LabelTitle>
        <LabelText>{data?.alarm1}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 2</LabelTitle>
        <LabelText>{data?.alarm2}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 3</LabelTitle>
        <LabelText>{data?.alarm3}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 4</LabelTitle>
        <LabelText>{data?.alarm4}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 5</LabelTitle>
        <LabelText>{data?.alarm5}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 6</LabelTitle>
        <LabelText>{data?.alarm6}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 7</LabelTitle>
        <LabelText>{data?.alarm7}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 8</LabelTitle>
        <LabelText>{data?.alarm8}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 9</LabelTitle>
        <LabelText>{data?.alarm9}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 10</LabelTitle>
        <LabelText>{data?.alarm10}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 11</LabelTitle>
        <LabelText>{data?.alarm11}</LabelText>
      </LabelItem>
      <LabelItem>
        <LabelTitle>Alarm 12</LabelTitle>
        <LabelText>{data?.alarm12}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Alarm 13</LabelTitle>
        <LabelText>{data?.alarm13}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Alarm 14</LabelTitle>
        <LabelText>{data?.alarm14}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Axes No</LabelTitle>
        <LabelText>{data?.axesno}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>On Off</LabelTitle>
        <LabelText>{data?.onoff}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>NC Program No</LabelTitle>
        <LabelText>{data?.ncprogno}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>NC Main Program No</LabelTitle>
        <LabelText>{data?.ncmainprogno}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Spindle No</LabelTitle>
        <LabelText>{data?.spindleno}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Operation Mode</LabelTitle>
        <LabelText>{data?.operationmode}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Current 1</LabelTitle>
        <LabelText>{data?.servocurrent1}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Current 2</LabelTitle>
        <LabelText>{data?.servocurrent2}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Current 3</LabelTitle>
        <LabelText>{data?.servocurrent3}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Current 4</LabelTitle>
        <LabelText>{data?.servocurrent4}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Current 5</LabelTitle>
        <LabelText>{data?.servocurrent5}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Motor Speed 1</LabelTitle>
        <LabelText>{data?.servomotorspeed1}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Motor Speed 2</LabelTitle>
        <LabelText>{data?.servomotorspeed2}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Motor Speed 3</LabelTitle>
        <LabelText>{data?.servomotorspeed3}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Motor Speed 4</LabelTitle>
        <LabelText>{data?.servomotorspeed4}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Servo Motor Speed 5</LabelTitle>
        <LabelText>{data?.servomotorspeed5}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Temp</LabelTitle>
        <LabelText>{data?.temp}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Gcode Group No</LabelTitle>
        <LabelText>{data?.gcodegroupno}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Gcode Flag</LabelTitle>
        <LabelText>{data?.gcodeflag}</LabelText>
      </LabelItem>

      <LabelItem>
        <LabelTitle>Gcode</LabelTitle>
        <LabelText>{data?.gcode}</LabelText>
      </LabelItem>
    </LabelContainer>
  )
}

export default Labels

const LabelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  margin-bottom: 50px;
`

const LabelItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  padding: 10px;
  height: 50px;
`

const LabelTitle = styled.div`
  font-size: 15px;
  font-weight: bolder;
  margin-bottom: 10px;
`

const LabelText = styled.div`
  font-size: 13px;
  font-weight: bold;
`
