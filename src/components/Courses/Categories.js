import React from 'react'
import { FcEngineering, FcFilmReel, FcMultipleDevices, FcMusic, FcOldTimeCamera, FcSalesPerformance, FcSportsMode } from 'react-icons/fc';
import CategoryItem from './CategoryItem';

const iconMap = {
  "Engineering": FcEngineering,
  "Filming": FcFilmReel,
  "Computer Science": FcMultipleDevices,
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Accounting": FcSalesPerformance,
  "Fitness": FcSportsMode,
}
const Categories = ({ items }) => {
  return (
    <div className='flex items-center gap-x-2 overflow-auto pb-2'>
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id} />
      ))}
    </div>
  )
}

export default Categories