const ProgressBar = ({ progress }) => {
    return (
      <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '20px',
            backgroundColor: 'green',
            borderRadius: '5px',
          }}
        />
      </div>
    );
  };
  
  export default ProgressBar;
  