"use client"
import { useEffect, useState } from 'react';
import { AlignJustify, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import '../Home/home.css';
import projects from './projects';
import skills from './skills';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let throttled = false;

    const mouseMove = e => {
      if (!throttled) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, -6); // Adjust the throttle time here (e.g., 100 milliseconds)
      }
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const eyes = document.querySelectorAll('.eye');
      eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const deltaX = event.clientX - eyeCenterX;
        const deltaY = event.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const pupilRadius = eye.querySelector('.pupil').offsetWidth / 2;
        const moveRadius = rect.width / 2 - pupilRadius - 10;

        const pupilX = moveRadius * Math.cos(angle);
        const pupilY = moveRadius * Math.sin(angle);

        eye.querySelector('.pupil').style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      });
    };

    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const variants = {
    default: { scale: 1 },
    large: { scale: 5, backgroundColor: '#FFFFFF', mixBlendMode: 'difference' },
    medium: { scale: 3, backgroundColor: '#FFFFFF', mixBlendMode: 'difference' },
    small: { scale: 1.5, backgroundColor: '#FFFFFF', mixBlendMode: 'difference' },
  };

  const handleMouseEnter = (variant) => () => {
    setCursorVariant(variant);
  };

  const handleMouseLeave = () => {
    setCursorVariant("default");
  };

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false); // Close the sheet
  };




  return (
    <>
    <div className=' overflow-x-hidden overflow-y-hidden '><div>
     <motion.div 
        className='bg-[#000] hidden md:block border-[2px] border-white z-20 h-[32px] w-[32px] pointer-events-none rounded-[50%] fixed top-0 left-0' 
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16
        }}
        variants={variants}
        animate={cursorVariant}
        whileHover="hover"
      />

      
          
     
      <div className="wrapper   pr-[20px] pl-[20px]  pb-[20px] sm:pb-[20px] h-[100vh]">

        <div className=" flex  justify-between mb-[-60px]   pt-[20px] navigation z-7   sm:pt-[20px] pb-[30px]  items-center ">
          <header className="navigation">
            <motion.img
            initial={{ y: -250}} 
            animate={{ y: 0}} 
            transition={{ delay: 0.2, type: 'tween' }} 

            onMouseEnter={handleMouseEnter('small')}
            onMouseLeave={handleMouseLeave} 
            className=" h-[30px] sm:h-[40px] navigation" src="./assets/logoblack.png" alt="logo" />
          </header>

          <nav className="font-[creg]  navigation text-xl flex items-center">
            <div className=' md:hidden'>
            <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <SheetTrigger><AlignJustify className='h-[30px] w-[30px]' /></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>
              <div className='mt-[50px] flex flex-col gap-3'>
                <a
                  className="px-5 z-0 text-white justify-center flex m-auto rounded-full w-[150px] bg-black text-2xl py-2"
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}>
                  <span>let&apos;s talk</span>
                </a>
                <a
                  className="px-5 z-0 text-black text-2xl py-1"
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}>
                  <span>services</span>
                </a>
                <a
                  className="px-5 z-0 text-black text-2xl py-1"
                  href="#projects"
                  onClick={(e) => handleLinkClick(e, 'projects')}>
                  <span>projects</span>
                </a>
                <a
                  className="px-5 z-0 text-black text-2xl py-1"
                  href="#about"
                  onClick={(e) => handleLinkClick(e, 'about')}>
                  <span>about</span>
                </a>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
  

            </div>

            <div onMouseEnter={handleMouseEnter('small')}
              onMouseLeave={handleMouseLeave} className="hidden md:flex items-center gap-5">
              <motion.a
                initial={{ y: -250}} 
                animate={{ y: 0}} 
                transition={{ delay: 0.1, type: 'tween' }}
                
                className=" px-5 z-0  border-[1px] border-gray-400 py-1 rounded-2xl hover:px-10 duration-300 "
                href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
                  }}  
                    ><span >services</span></motion.a>
              
              <motion.a
                initial={{ y: -250}} 
                animate={{ y: 0}} 
                transition={{ delay: 0.2, type: 'tween' }}
                
                className=" px-5 border-[1px] border-gray-400 py-1 rounded-2xl hover:px-10 duration-300"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                }}  
                >projects</motion.a>
              
              <motion.a 
                initial={{ y: -250}} 
                animate={{ y: 0}} 
                transition={{ delay: 0.3, type: 'tween' }}
                className=" px-5 border-[1px] border-gray-400 py-1 rounded-2xl hover:px-10 duration-300"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                }}  
                >about</motion.a>
              
              <motion.button 
                initial={{ y: -250}} 
                animate={{ y: 0}} 
                transition={{ delay: 0.4, type: 'tween' }}
                className='bg-neutral-800 z-1 text-white  border-[1px] border-neutral-800  py-[5px] px-5 rounded-2xl hover:px-10 duration-300' 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}> 
                let&apos;s talk</motion.button>
            </div>
            

          </nav>
        </div>

        
        <div className="name text-center relative   z-0">
          <motion.h1 
          initial={{ opacity: 0}} 
          animate={{ opacity: 1}} 
          transition={{ delay: 0.5, type: 'spring', stiffness: 120}}
          onMouseEnter={handleMouseEnter('large')}
          onMouseLeave={handleMouseLeave}
           data-text="PRIYAV PITHIA" className="  xl:text-[352px] md:ml-[-10px] hover:text-[#161616] transition ease-in-out delay-150 mt-[40px]  lg:mt-[-40px] font-abo str leading-[1] text-[25vw] sm:text-[25.5vw] md:text-[26.5vw] lg:text-[26.5vw] ">
            PRIYAV PITHIA</motion.h1>
        </div>

        <div className="sm:pb-[200px] lg:pb-[150px]  xl:pb-[100px] ">
          <motion.img
          initial={{ y: '100vh', opacity: 0}} 
          animate={{ y: 0, opacity: 1}} 
          transition={{ delay: 0.2, type: 'tween'}}
          onMouseEnter={handleMouseEnter('large')}
          onMouseLeave={handleMouseLeave}

            className= "h-[350px]  sm:h-[500px] top-[45%] left-[30%] sm:top-[200px] sm:left-[100px]  md:top-[220px] md:left-[120px] lg:top-[300px] lg:left-[150px] xl:top-[300px] xl:left-[200px] 2xl:top-[300px] 2xl:left-[350px] absolute"
            src="./assets/port.png" alt="" />

          <div

           className=" sm:ml-[40%] xl:ml-[30%] text-center sm:text-start lg:mb-[-60px]">
            <motion.h1
            initial={{ x: '100vw'}} 
            animate={{ x: 0}} 
            transition={{ delay: 0.2, type: 'tween'}}
            onMouseEnter={handleMouseEnter('medium')}
            onMouseLeave={handleMouseLeave}
              className=" ml-[-10px] font-[ocr] text-4xl sm:text-5xl lg:text-[70px] xl:text-[100px] mt-[30px] sm:mt-[100px] lg:mt-[100px]">WEB DEVELOPER</motion.h1>
            <motion.p
            initial={{ x: '100vw'}} 
            animate={{ x: 0}} 
            transition={{ delay: 0.4, type: 'tween'}}
            onMouseEnter={handleMouseEnter('small')}
            onMouseLeave={handleMouseLeave}
             className=" font-[creg] sm:text-[20px] lg:text-[30px] mt-[10px] sm:mt-[20px]"> An aspiring computer scientist with skills in web development and UI/UX design</motion.p>
          </div>
        </div>

        <div 
        onMouseEnter={handleMouseEnter('small')}
              onMouseLeave={handleMouseLeave}
        className="pt-[200px] sm:pt-[0] ">
          <div className="absolute bottom-[20px]">
          <a className='cursor-pointer' onClick={() => handleImageClick("https://www.linkedin.com/in/priyav-pithia/")}
                >
            <svg className="md:hidden ml-[-32px] hover:scale-110 " xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="30" viewBox="0 0 50 50">
              <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
            </svg> </a>
            <a className='cursor-pointer' onClick={() => handleImageClick("https://www.instagram.com/__.phase?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==")}
                 >
            <svg className="md:hidden mt-2 hover:scale-110  ml-[-32px]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="30" viewBox="0 0 50 50">
              <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
            </svg></a>

            <a className='cursor-pointer' onClick={() => handleImageClick("https://www.facebook.com/Devellopix/")}
                 >
            <svg className="md:hidden mt-2 hover:scale-110  ml-[-32px]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="30" viewBox="0 0 50 50">
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"></path>
            </svg></a>
            <div className=" md:hidden vertical"></div>

          </div>

                <a className='cursor-pointer' onClick={() => handleImageClick("https://www.linkedin.com/in/priyav-pithia/")}
                >
                <motion.svg
          initial={{ y: '100vh'}} 
          animate={{ y: 0}} 
          transition={{ delay: 0.2, type: 'tween'}}
           className="hidden w-[100px] h-[30px]  cursor-pointer 2xl:flex ml-[-32px]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 50 50">
            <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
          </motion.svg>
                </a>
          
                <a className='cursor-pointer' onClick={() => handleImageClick("https://www.instagram.com/__.phase?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==")}
                 >
          <motion.svg
          initial={{ y: '100vh'}} 
          animate={{ y: 0}} 
          transition={{ delay: 0.2, type: 'tween'}}
        
           className="hidden 2xl:flex mt-2 ml-[-32px]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="30" viewBox="0 0 50 50">
            <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
          </motion.svg>
          </a>

          <a className='cursor-pointer' onClick={() => handleImageClick("https://www.facebook.com/Devellopix/")}
                 >
          <motion.svg
          initial={{ y: '100vh'}} 
          animate={{ y: 0}} 
          transition={{ delay: 0.2, type: 'tween'}}
        
           className="hidden 2xl:flex mt-2 ml-[-32px]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="30" viewBox="0 0 50 50">
           <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"></path>
       
          </motion.svg>
          </a>

          <div className="flex justify-between">

            <motion.div
            initial={{ y: '100vh'}} 
            animate={{ y: 0}} 
            transition={{ delay: 0.2, type: 'tween'}}
             className="hidden 2xl:flex vertical"></motion.div>



            {/*<div className="absolute items-center mt-5 left-[65%] sm:left-[70%] bottom-[30%] lg:bottom-[5%] lg:left-[50%] circle">
              <div className="logo "> <img src="./assets/arrowdown.svg" alt="" />
              </div>
              <div className="text font-[creg]">
                {/*<p>HOVER-HOVER-HOVER-</p> 

              </div>
            </div>*/}

            <motion.div
            initial={{ x: '100vh'}} 
            animate={{ x: 0}} 
            transition={{ delay: 0.2, type: 'tween'}}
             className=" items-end ">
              <p 
              onMouseEnter={handleMouseEnter('small')}
              onMouseLeave={handleMouseLeave}
              className="font-[creg] text-lg mb-[-15px] hidden 2xl:flex md:justify-end  right">Tech Stack</p>
              <div
              onMouseEnter={handleMouseEnter('small')}
              onMouseLeave={handleMouseLeave}
               className=" gap-5 items-center hidden 2xl:flex">

                <img className="h-[32px] mt-5" src="./assets/svgs/nextjs.svg" alt="" />
                <img className="h-[32px] mt-5" src="./assets/svgs/react.svg" alt="" />
                <img className="h-[35px] mt-5" src="./assets/svgs/tailwind.svg" alt="" />
               
                <img className="h-[30px] mt-5 " src="./assets/tech/wordpress.svg" alt="" />

                <img className="h-[35px] mt-5 " src="./assets/tech/Daco_4796123 1.svg" alt="" />
                <img className="h-[35px] mt-5" src="./assets/tech/Daco_4796123 2.svg" alt="" />

                <img className="h-[35px] mt-5" src="./assets/tech/Daco_4796123 3.svg" alt="" />
                <img className="h-[30px] mt-5" src="./assets/svgs/figma.svg" alt="" />
                <img className="h-[30px] mt-5" src="./assets/svgs/canva.svg" alt="" />
                <img className="h-[30px] mt-5" src="./assets/svgs/shopify.svg" alt="" />
                
                <div className="hoz"></div>
              </div>
            </motion.div>

          </div>



        </div>

      </div>


      <section className=" bg-black  ">

        <div className="wrapper pr-[20px] pl-[20px] pt-[20px] pb-[20px] sm:pt-[40px] sm:pb-[40px]">
          <div className=' flex lg:h-[100vh] h-[60vh] '>
          <motion.h1
          initial={{ y: '20vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.3, type: 'tween'}}
          onMouseEnter={handleMouseEnter('large')}
          onMouseLeave={handleMouseLeave}
           className="font-[gbold]  primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl m-auto flex justify-center align-middle  w-full ">I create elevating digital experiences that inspire and connect with people through development and design.  </motion.h1>
            
          </div>
          </div>

      </section>

      <section id='projects' className=' bg-black pb-[10px] md:pb-[100px]' >

      

      <div className='wrapper md:container'>
      <motion.h1 
      initial={{ y: '10vh', opacity: 0}} 
      whileInView={{ y: 0, opacity:1}} 
      transition={{ delay: 0.3, type: 'tween'}}
      onMouseEnter={handleMouseEnter('medium')}
          onMouseLeave={handleMouseLeave}
      className="font-[gbold] primary  text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-[30px] text-center lg:mb-[100px]">my projects</motion.h1>
      
<motion.div
initial={{ y: '10vh', opacity: 0}} 
whileInView={{ y: 0, opacity:1}} 
transition={{ delay: 0.3, type: 'tween'}}

 className='md:grid grid-cols-2 px-4 md:px-0 gap-7'>
  {projects.map((project, index) => (
    <div key={index} className="relative">
      <div 
        className=' inline-block overflow-hidden overflow-y-hidden'
        onMouseEnter={() => handleMouseHover(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <img 
          onMouseEnter={handleMouseEnter('small')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleImageClick(project.url)} // Add onClick handler here
          className='hover:scale-110 cursor-pointer duration-300 transition-transform md:w-[630px] md:h-[460px] object-cover' 
          src={project.photo_url} 
          alt={project.title} 
        />
        
      </div>
      <div 
      onMouseEnter={() => handleMouseHover(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className='flex justify-between items-center primary text-sm md:text-xl mt-1 font-[creg] mb-5'>
        <h2 onMouseEnter={handleMouseEnter('small')}
          onMouseLeave={handleMouseLeave}>
            {project.title}</h2>
        <a 
          onMouseEnter={handleMouseEnter('small')}
          onMouseLeave={handleMouseLeave}
          href={project.url} 
          target="_blank"
          rel="noopener noreferrer"
          className={` primary px-2 py-1 items-center transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className='flex gap-1 items-center'>VISIT SITE <ArrowUpRight className='h-[18px] sm:h-[30px] mb-1' /></span>
        </a>
      </div>
    </div>
  ))}
</motion.div>


          
        
      </div>
      </section>

      <section className=' bg-black'>
      <section className='wrapper '>
      <div className=' pt-[70px] pb-[10px]  md:pt-[90px] md:pb-[90px] justify-center items-center m-auto content-center'>
        <motion.h1 
      initial={{ y: '10vh', opacity: 0}} 
      whileInView={{ y: 0, opacity:1}} 
      transition={{ delay: 0.3, type: 'tween'}}
      onMouseEnter={handleMouseEnter('medium')}
          onMouseLeave={handleMouseLeave}
      className="font-[gbold] primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-[20px] mb-[20px]  text-center lg:mb-[90px]">my skills</motion.h1>

      <div>

      <motion.div
      initial={{ y: '10vh', opacity: 0}} 
      whileInView={{ y: 0, opacity:1}} 
      transition={{ delay: 0.3, type: 'tween'}}

       className="grid grid-cols-4 md:grid-cols-4 mb-[40px]  md:gap-[50px] p-4">
      {skills.map((skill, index) => (
        <div
        
      
          key={index}
          className="flex justify-center items-center p-4 "
        >
          {skill.svg && (
            <motion.div onMouseEnter={handleMouseEnter('small')}
            onMouseLeave={handleMouseLeave}
            
              
              
              
              className=" hover:scale-125 primary hover:text-red-500 transition-ease duration-300">
                
                {skill.svg}
                
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>

      </div>

        </div>
      </section>
      </section>


      
      






    </div>
    
    <section id='services' className="lg:h-[100vh] bg-black ">
        <div className="wrapper primary pr-[20px] pl-[20px] pt-[20px] pb-[20px] sm:pt-[40px] sm:pb-[40px]">

          <motion.h1 
          initial={{ y: '10vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.3, type: 'tween'}}
          onMouseEnter={handleMouseEnter('medium')}
          onMouseLeave={handleMouseLeave}
          className="font-[gbold] primary  text-4xl md:text-5xl lg:text-6xl xl:text-7xl  mt-[40px] lg:mt-[80px] text-center lg:mb-[100px]">services</motion.h1>
          <motion.div
          initial={{ y: '10vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.3, type: 'tween'}}
           className="mt-[50px]  md:hidden mb-[100px] flex flex-col gap-4 skew-y-[-1deg]">
            <a 
            data-text="WEB DEVELOPMENT"  className="font-[cbold] primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl  skew flex ">
            WEB DEVELOPMENT</a>
            <p className="border-b-[1px]"></p>
            <a data-text="WEB DESIGN"  className="font-[cbold] primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl skew flex">
              WEB DESIGN</a>
            <p className="border-b-[1px]"></p>
            <a data-text="UI/UX DESIGN"  className="font-[cbold] primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl skew flex">
            UI/UX DESIGN</a>
            <p className="border-b-[1px]"></p>
            <a data-text="LOGO DESIGN"  className="font-[cbold] primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl skew flex">
              LOGO DESIGN</a>
            <p className="border-b-[1px]"></p>

          </motion.div>

          <div className='flex items-center primary   gap-[90px] '>
          <motion.div 
          initial={{ y: '10vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.4, type: 'tween'}}
          className="mt-[50px] primary  w-[45vw]  hidden md:flex flex-col gap-4 skew-y-[-1deg]">
            <a 
            onMouseEnter={handleMouseEnter('small')}
            onMouseLeave={handleMouseLeave}
            data-text="WEB DEVELOPMENT"  className="list font-[cbold] primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl  skew flex ">
            WEB DEVELOPMENT
              <span className="photo"><img src="./assets/tt.PNG" alt="" /></span>
            </a>
            <p className="border-b-[1px]"></p>
            <a
            onMouseEnter={handleMouseEnter('small')}
            onMouseLeave={handleMouseLeave}
             data-text="WEB DESIGN" className="font-[cbold] text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl skew flex">
            WEB DESIGN</a>
            <p className="border-b-[1px]"></p>
            <a 
            onMouseEnter={handleMouseEnter('small')}
            onMouseLeave={handleMouseLeave}
            data-text="UI/UX DESIGN"  className="font-[cbold] primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl skew flex">
            UI/UX DESIGN</a>
            <p className="border-b-[1px]"></p>
            <a
            onMouseEnter={handleMouseEnter('small')}
            onMouseLeave={handleMouseLeave} 
            data-text="LOGO DESIGN"  className="font-[cbold] primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl skew flex">
            LOGO DESIGN</a>
            <p className="border-b-[1px]"></p>

            


          </motion.div>
           <div className='hidden md:flex'>
           <motion.div
           initial={{ y: '10vh', opacity: 0}} 
           whileInView={{ y: 0, opacity:1}} 
           transition={{ delay: 0.5, type: 'tween'}} 
           className=" box ">
              <div className=" eye">
                <div class="pupil"></div>
              </div>
              <div class="eye">
                <div class="pupil"></div>
              </div>
            </motion.div>
           </div>
          </div>
        </div>

      </section>

      <section id='about' className=" bg-black ">
        <div className="wrapper primary pr-[20px] pl-[20px] pt-[20px] pb-[20px] sm:pt-[40px] sm:pb-[40px]">

          <motion.h1 
          initial={{ y: '10vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.3, type: 'tween'}}
          onMouseEnter={handleMouseEnter('medium')}
          onMouseLeave={handleMouseLeave}
          className="font-[gbold] primary  text-4xl md:text-5xl lg:text-6xl xl:text-7xl  lg:mt-[80px] text-center lg:mb-[140px]">about me</motion.h1>
          
          

          <div className='md:grid grid-cols-2 items-center primary justify-between    gap-[90px] '>
          <motion.div 
          initial={{ y: '10vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.3, type: 'tween'}}
          onMouseEnter={handleMouseEnter('medium')}
          onMouseLeave={handleMouseLeave}
          className='inline-block overflow-hidden overflow-y-hidden'
          >
          <img className=' md:h-[700px] mt-[60px] md:mt-[0px]  hover:scale-110 duration-300 transition-transform  object-cover' src="./assets/me/me.jpg" alt="" />

            


          </motion.div>
           
           <motion.div
           onMouseEnter={handleMouseEnter('small')}
           onMouseLeave={handleMouseLeave}
           initial={{ y: '10vh', opacity: 0}} 
           whileInView={{ y: 0, opacity:1}} 
           transition={{ delay: 0.5, type: 'tween'}} 
           className=" col-span-1">
              <p className=' mt-[20px] md:mt-[0px] md:text-2xl'>
              I am a web developer with about half a decade of experience, 
              furnishing my skills and expertise in both programming and design. <br /><br />

              Armed with a Bachelor&apos;s degree in Computer Science, 
              I have gone deep into the intricacies of creative web development, specializing in areas such as web development, ecommerce 
              and UI/UX design.  <br /><br />
              
              Beyond the confines of academia, I&apos;ve passionately pursued my interests in music, 
              kickboxing, and football, finding inspiration and balance outside the world of programming. <br /><br />
              With a firm commitment 
              to innovation and user-centric design, I approach every project with enthusiasm and dedication, striving to 
              deliver outstanding digital experiences that resonate with audiences.
              </p>
              
             
            </motion.div>
           </div>
          </div>
       

      </section>

      <section id='contact' className=" bg-black ">
        <div className="wrapper primary pr-[20px] pl-[20px] pt-[20px] pb-[20px] sm:pt-[40px] sm:pb-[40px]">

          <motion.h1 
          initial={{ y: '10vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.3, type: 'tween'}}
          onMouseEnter={handleMouseEnter('medium')}
          onMouseLeave={handleMouseLeave}
          className="font-[gbold] primary  text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-[100px]  lg:mt-[180px] text-center lg:mb-[40px]">
          let&apos;s work together</motion.h1>

          <motion.h2 
          initial={{ y: '10vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.3, type: 'tween'}}
          onMouseEnter={handleMouseEnter('medium')}
          onMouseLeave={handleMouseLeave}
          
          className="font-[greg] primary mt-[60px] md:mt-[100px] text-xl md:text-2xl text-center ">
          SEND ME A MESSAGE</motion.h2>

          <motion.a 
          initial={{ y: '10vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.3, type: 'tween'}}
          onMouseEnter={handleMouseEnter('medium')}
          onMouseLeave={handleMouseLeave}
          href= "mailto: priyavpithia7@gmail.com"
          
          className="font-[abo] text-[45px] justify-center flex   md:text-[86.5px] md:mb-[40px]  text-center hover:underline underline-offset-[5px] decoration-[4px]">
          PRIYAVPITHIA7<span className=' font-[ocr]'>@</span>GMAIL.COM</motion.a>

          <motion.div 
          initial={{ y: '10vh', opacity: 0}} 
          whileInView={{ y: 0, opacity:1}} 
          transition={{ delay: 0.3, type: 'tween'}}
          onMouseEnter={handleMouseEnter('medium')}
          onMouseLeave={handleMouseLeave}
          className=' justify-center flex'
          >
            <div className='inline-block overflow-hidden overflow-y-hidden'>
            <img className=' md:h-[700px] md:w-[617px] mt-[30px] md:mt-[0px]  hover:scale-110 duration-300 transition-transform  object-cover' src="./assets/me/me2.jpg" alt="" />
            <motion.h2 
            initial={{ y: '10vh', opacity: 0}} 
            whileInView={{ y: 0, opacity:1}} 
            transition={{ delay: 0.3, type: 'tween'}}
            onMouseEnter={handleMouseEnter('small')}
            onMouseLeave={handleMouseLeave}
          
            className="font-[greg] primary mt-[80px] text-xl md:text-2xl text-center ">
            FOLLOW ME</motion.h2>
            
            <div 
            
            className='grid grid-cols-2 md:flex justify-between mt-[0px] md:gap-8 '>
                
                <motion.a 
                initial={{ y: '10vh', opacity: 0}} 
                whileInView={{ y: 0, opacity:1}} 
                transition={{ delay: 0.3, type: 'tween'}}
                onMouseEnter={handleMouseEnter('small')}
                onMouseLeave={handleMouseLeave}
                className=' font-[abo] text-[50px] md:text-[70px] cursor-pointer hover:underline underline-offset-[5px] decoration-[4px]' 
                onClick={() => handleImageClick("https://www.linkedin.com/in/priyav-pithia/")}
                >
                  LINKEDIN</motion.a>
                
                <motion.a 
                initial={{ y: '10vh', opacity: 0}} 
                whileInView={{ y: 0, opacity:1}} 
                transition={{ delay: 0.4, type: 'tween'}}
                onMouseEnter={handleMouseEnter('small')}
                onMouseLeave={handleMouseLeave}

                className=' font-[abo] text-[50px] cursor-pointer md:text-[70px] hover:underline underline-offset-[5px] decoration-[4px]' 
                
                  onClick={() => handleImageClick("https://www.instagram.com/__.phase?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==")}
                  >
                    INSTAGRAM</motion.a>
                
                
                <motion.a
                initial={{ y: '10vh', opacity: 0}} 
                whileInView={{ y: 0, opacity:1}} 
                transition={{ delay: 0.5, type: 'tween'}}
                onMouseEnter={handleMouseEnter('small')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleImageClick("https://www.facebook.com/Devellopix/")}
                 className=' font-[abo] cursor-pointer text-[50px] md:text-[70px] hover:underline underline-offset-[5px] decoration-[4px]' 
                 >
                  FACEBOOK</motion.a>

                </div>
            </div>

            


          </motion.div>

          </div>
       

      </section>


      <footer className='bg-black'>
        <div className='wrapper '>
        <div className=' justify-center flex'>
        <motion.h1 
         
          onMouseEnter={handleMouseEnter('large')}
          onMouseLeave={handleMouseLeave}
           data-text="PRIYAV PITHIA" className=" mt-[80px] xl:text-[360px] md:ml-[-10px] primary transition ease-in-out delay-150  mb-[80px]   font-[abo]  leading-[1] text-[25vw] sm:text-[25.5vw] md:text-[26.5vw] lg:text-[26.5vw] ">
            PRIYAV PITHIA</motion.h1>
        </div>

        <div className=' px-[20px] md:px-0 flex justify-between'>
          <motion.p 
          onMouseEnter={handleMouseEnter('small')}
          onMouseLeave={handleMouseLeave}
          className=' font-[greg] primary text-xl md:text-3xl pb-[30px] hover:underline underline-offset-[5px] decoration-[2px]'>
            ©2024</motion.p>
          <motion.a 
          onMouseEnter={handleMouseEnter('small')}
          onMouseLeave={handleMouseLeave}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className=' co font-[greg] primary text-xl md:text-3xl hover:underline underline-offset-[5px] decoration-[2px] cursor-pointer' >BACK TO TOP</motion.a>
        </div>
        </div>

      </footer>
      

      

    

      </div>
    </>
    
  )
}


