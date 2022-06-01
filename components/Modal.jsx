import React,{useEffect,useState} from 'react'
import ModalStyle from '../styles/Modal.module.scss'
import {MdCancel} from 'react-icons/md';
import { img_300 } from '../config/config'


const Modal = ({content,setToggleModal,toggleModal}) => {
  const [modalContent,setModalContent] = useState({})
  useEffect(()=>{
      const fetchData = async () =>{
        const res = await fetch(`https://api.themoviedb.org/3/${content.media_type}/${content.id}?api_key=5337a3932c7f5952d92e1ea0248df79e&language=en-US`)
        setModalContent(await res.json())
    }
    if(content){
        fetchData()
    }
    return ()=>{
      setModalContent({})
    }
},[content])
  return (
    <>
    {
      content.media_type === 'movie'?
    
            <div className={ModalStyle.container} onClick={()=>setToggleModal(!toggleModal)}>
                <div className={ModalStyle.cross}>
                    <MdCancel style={{fontSize:'1.5rem'}}/>
                </div>
                {modalContent?
                <div>
                    <div className={ModalStyle.poster}>
                      <img src={`${img_300}/${modalContent.poster_path}`} width={200} height={300}></img>
                      <div className={ModalStyle.desc}>
                        <span>Description</span>
                        <p>{modalContent.overview}</p>
                        <p><span style={{fontWeight:'600'}}> Duration</span> : {modalContent.runtime}</p>
                        <span style={{fontSize:'1rem',fontWeight:'600',marginRight:'.5rem'}}>genres:</span>
                        {modalContent.genres ? modalContent?.genres.map(item=>{
                          return <span style={{fontSize:'1rem',fontWeight:'normal',marginRight:'.5rem'}} key={item.id}>{item.name}</span>
                        }):null}
                        <div>Ratings : {modalContent.vote_average}</div>
                        <div>Release Date : {modalContent.release_date}</div>
                      </div>
                    </div>
                </div>
                :null}
                <div className={ModalStyle.title}>Movie - {modalContent.original_title}</div>
            </div> : 
               <div className={ModalStyle.container} onClick={()=>setToggleModal(!toggleModal)}>
                 <div className={ModalStyle.cross}>
                    <MdCancel style={{fontSize:'1.5rem'}}/>
                </div>
               {modalContent?
               <div>
                   <div className={ModalStyle.poster}>
                     <img src={`${img_300}/${modalContent.poster_path}`} width={200} height={300}></img>
                     <div className={ModalStyle.desc}>
                        <span>Description</span>
                        <p>{modalContent.overview}</p>
                        {/* <p><span style={{fontWeight:'500'}}> Duration</span> : {modalContent?.episode_run_time[0]}</p> */}
                        <span style={{fontSize:'1rem',fontWeight:'600',marginRight:'.5rem'}}>genres:</span>
                        {modalContent.genres ? modalContent?.genres.map(item=>{
                          return <span style={{fontSize:'1rem',fontWeight:'normal',marginRight:'.5rem'}} key={item.id}>{item.name}</span>
                        }):null}
                         <div>Ratings : {modalContent.vote_average}</div>
                         <div>Release Date : {modalContent.first_air_date}</div>
                      </div>
                   </div>
               </div>
               :null}
               <div className={ModalStyle.title}>TV - {modalContent.original_name}</div>
           </div>
    }
    </>
  )
}

export default Modal