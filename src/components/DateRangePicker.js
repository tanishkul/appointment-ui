import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React from 'react';
import { DateRangePicker } from 'react-date-range';

const DateRangeComponent = (props) => {
  const { value, setValue } = props;

  const handleSelect = (ranges) => {
    const { endDate, startDate } = ranges.range1;
    if (startDate && endDate) {
      setValue({ startDate, endDate });
    }
  }

  return (
    <DateRangePicker
      onChange={e => handleSelect(e)}
      ranges={[value]}
    />
  )
}
export default DateRangeComponent;
