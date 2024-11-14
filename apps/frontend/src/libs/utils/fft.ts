import FFT from 'fft.js'

export const performFFT = (data: number[]): [number, number][] => {
  const fft = new FFT(data.length)
  const complexArray = fft.createComplexArray()

  fft.toComplexArray(data, complexArray)
  fft.realTransform(complexArray, data)
  fft.completeSpectrum(complexArray)

  const complexResult: [number, number][] = []

  for (let i = 0; i < complexArray.length; i += 2) {
    complexResult.push([complexArray[i], complexArray[i + 1]])
  }

  return complexResult
}
