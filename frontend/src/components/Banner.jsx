import bgImg from '../assets/bgImg.jpg';

const Banner = () => {
  return (
    <section className="relative w-[90%] bg-indigo-100 inset-x-[5rem] inset-y-[3rem] h-[25rem] overflow-hidden">
      <div className="relative bg-fixed" >
        <img src={bgImg} className="object-contain w-[100%] h-[80%]" />
      </div>
      <div className="absolute w-[100%] h-[100%] backdrop-blur-sm backdrop-saturate-125 top-0 z-5"></div>
      <p className="font-gabarito text-2xl font-bold text-sky-400 text-start absolute top-[3rem] left-[3rem]">Welcome to to do list app!</p>
      <p className="font-gabarito text-7xl font-bold text-sky-400 text-start absolute left-[3rem] top-[5rem]">Create or Login 
      <br/>to your account and create lists.</p>
    </section>
  );
}

export default Banner;