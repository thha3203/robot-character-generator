export default function Loader({ show }) {
  if (show) {
    return <div className='loader'></div>;
  } else {
    return null;
  };
};