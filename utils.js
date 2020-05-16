colors = require('colors')

const validateDate = dateString => {
    const reg = /^\d{4}-\d{2}-\d{2}$/
    if (reg.test(dateString)) {
      const parts = dateString.split('-')
      
      if (Number(parts[1] > 12 || Number(parts[2]) > 31 )) {
          console.log(' Rule: Month < 12 | Day < 31'.red)
          return false
      } else {
        return true
      }
    }
    console.log(' Rule: date format 0000-00-00'.red)
    return false
  }

module.exports = validateDate
