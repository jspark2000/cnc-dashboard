import { useState } from 'react'
import FFTSection from './FFTSection'

const FFTAndSTFTPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<
    'current' | 'x' | 'y' | 'z'
  >('current')

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: 'current' | 'x' | 'y' | 'z') => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  const options: ('current' | 'x' | 'y' | 'z')[] = ['current', 'x', 'y', 'z']

  return (
    <div className="grid w-full overflow-x-auto p-5">
      <div className="flex items-center space-x-5 pb-5">
        <h1 className="text-xl font-bold">데이터 컬럼 선택</h1>
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {selectedOption ? selectedOption : '컬럼 선택'}
            <svg
              className="-mr-1 ml-2 mt-1.5 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707 1.707l-3 3a1 1 0 01-1.414 0l-3-3A1 1 0 014.293 3.293L7 5.586l2.293-2.293A1 1 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <ul className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <FFTSection col={selectedOption} magnitudeThreshold={100} />
    </div>
  )
}

export default FFTAndSTFTPage
