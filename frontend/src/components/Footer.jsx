import superMarioImg from '../../public/superMario.png'

export default function Footer() {
  return (
    <div className='footer'>
      <p className='superMario'>
        Theme Inspired by Super Mario
        <img className='superMario__img' alt='A super mario image' src={superMarioImg} />
      </p>
    </div>
  )
}
