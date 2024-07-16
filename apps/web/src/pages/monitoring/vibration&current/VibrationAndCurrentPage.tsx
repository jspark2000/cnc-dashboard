import VibrationFFTSection from '../../../components/monitoring/VibrationFFT'

const VibrationAndCurrentPage: React.FC = () => {
  return (
    <div className="flex w-full items-center p-5">
      <div className="w-1/2">
        <VibrationFFTSection />
      </div>
    </div>
  )
}

export default VibrationAndCurrentPage
