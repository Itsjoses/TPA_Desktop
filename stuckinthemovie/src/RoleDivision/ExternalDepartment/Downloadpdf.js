import React from 'react'

const Downloadpdf = () => {
    const downloadReport = () => {
        fetch('test.pdf').then(response => {
              response.blob().then(blob => {
              const fileURL = window.URL.createObjectURL(blob);
              let alink = document.createElement('a');
              alink.href = fileURL;
              alink.download = 'test.pdf';
              alink.click();
            })
          })
        }
  return (
    <div>
      <button onClick={downloadReport}> Download Report </button>
    </div>
  )
}

export default Downloadpdf
