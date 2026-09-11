const menu=document.querySelector('.menu'),nav=document.querySelector('nav'),header=document.querySelector('.header');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('nav a').forEach(l=>l.addEventListener('click',()=>nav.classList.remove('open')));
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20));
const modal=document.getElementById('estimateModal'),openBtn=document.getElementById('openEstimate'),heroBtn=document.getElementById('heroEstimate'),closeBtn=document.getElementById('closeEstimate'),overlay=document.querySelector('.estimate-overlay');
function openModal(e){if(e)e.preventDefault();modal.classList.add('active');document.body.classList.add('modal-open')}
function closeModal(){modal.classList.remove('active');document.body.classList.remove('modal-open')}
openBtn.addEventListener('click',openModal);heroBtn.addEventListener('click',openModal);closeBtn.addEventListener('click',closeModal);overlay.addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(reviewModal.classList.contains('active'))closeReviewModal();else if(serviceModal.classList.contains('active'))closeServiceModal();else if(modal.classList.contains('active'))closeModal()}});
window.addEventListener('load',()=>setTimeout(openModal,1200));
// SERVICE DETAIL MODALS
const serviceModal=document.getElementById('serviceModal');
const serviceClose=document.getElementById('closeService');
const serviceOverlay=document.querySelector('.service-overlay');
const serviceEstimate=document.getElementById('serviceEstimate');
const serviceNumber=document.getElementById('serviceDetailNumber');
const serviceTitle=document.getElementById('serviceDetailTitle');
const serviceIcon=document.getElementById('serviceDetailIcon');
const serviceLead=document.getElementById('serviceDetailLead');
const serviceText=document.getElementById('serviceDetailText');
const serviceList=document.getElementById('serviceDetailList');
const serviceData={
  '01':{title:'GENERAL CONSTRUCTION',icon:'⌂',lead:'Complete construction support for projects from planning through completion.',text:'Our general construction service helps coordinate the major stages of a building project. We focus on dependable workmanship, organized project coordination and practical solutions for residential and commercial properties.',items:['Project planning and preparation','Structural and general construction work','Interior and exterior improvements','Project coordination and finishing']},
  '02':{title:'DESIGN & BUILD',icon:'↗',lead:'A streamlined approach that brings planning, design and construction together.',text:'Design and build services make it easier to move from an initial idea to a finished space. We help develop practical solutions while keeping the project focused on your goals, property and budget.',items:['Project concept and planning','Design coordination','Construction execution','Finishing and project completion']},
  '03':{title:'HOME IMPROVEMENT',icon:'⌁',lead:'Practical upgrades that improve the comfort, function and appearance of your home.',text:'Whether you are updating one area or improving several parts of your property, our home improvement service focuses on quality work and details that make your space more useful and enjoyable.',items:['Interior improvements','Exterior upgrades','Property repairs and updates','Finish and detail improvements']},
  '04':{title:'ROOFING & WATERPROOFING',icon:'▰',lead:'Protection-focused construction work designed to help keep your property durable and secure.',text:'Roofing and waterproofing work plays an important role in protecting a property from weather and moisture. We provide solutions focused on proper preparation, quality installation and long-term performance.',items:['Roofing work and improvements','Waterproofing solutions','Weather protection','Inspection and repair support']},
  '05':{title:'KITCHENS & BATHROOMS',icon:'▦',lead:'Functional remodeling solutions that bring together practical layouts, style and quality.',text:'Kitchens and bathrooms are some of the most used spaces in a property. Our remodeling service can help refresh outdated areas, improve functionality and create a more finished look.',items:['Kitchen remodeling','Bathroom remodeling','Layout and finish improvements','Cabinet, surface and fixture updates']},
  '06':{title:'BASEMENT REMODELING',icon:'▤',lead:'Turn an underused basement into a more comfortable and useful part of your property.',text:'Basement remodeling can add valuable living, work or recreation space. We help transform existing areas with practical improvements while considering the condition and needs of the property.',items:['Basement layout improvements','Finished living areas','Flooring, walls and ceilings','General remodeling and finishing']},
  '07':{title:'MASONRY / PAVERS / CONCRETE',icon:'◇',lead:'Durable masonry and concrete solutions for functional and attractive property improvements.',text:'From walkways and patios to concrete and masonry improvements, our team focuses on solid preparation, clean installation and durable results that complement the property.',items:['Paver installation','Concrete work','Masonry improvements','Walkways, patios and exterior surfaces']},
  '08':{title:'FENCING & ENCLOSURES',icon:'□',lead:'Practical fencing and enclosure solutions that add privacy, security and definition to your property.',text:'A well-planned fence can improve the function and appearance of a property. We provide fencing and enclosure work suited to residential and commercial needs.',items:['Fence installation','Property enclosures','Privacy and boundary solutions','Repair and improvement work']},
  '09':{title:'REMODELS & RENOVATIONS',icon:'+',lead:'Refresh existing spaces with improvements that make them feel more functional and up to date.',text:'Renovation projects can range from focused room updates to larger transformations. We help improve existing spaces while keeping the work organized and aligned with the desired result.',items:['Room remodeling','Interior renovations','Exterior renovations','Space updates and finishing']},
  '10':{title:'FIRE & WATER DAMAGE RESTORATION',icon:'↺',lead:'Construction-focused restoration support to help damaged spaces move toward recovery.',text:'After fire or water damage, a property may need repairs, rebuilding and improvements before it can return to normal use. Our restoration service focuses on construction and property improvement needs.',items:['Damage-related repairs','Rebuilding and replacement work','Interior restoration improvements','Finishing and property recovery support']}
};
function openService(e){
  e.preventDefault();
  const data=serviceData[e.currentTarget.dataset.service];
  if(!data)return;
  serviceNumber.textContent=e.currentTarget.closest('.card').querySelector('.num').textContent;
  serviceTitle.textContent=data.title;
  serviceIcon.textContent=data.icon;
  serviceLead.textContent=data.lead;
  serviceText.textContent=data.text;
  serviceList.innerHTML=data.items.map(item=>`<li>${item}</li>`).join('');
  serviceModal.classList.add('active');
  serviceModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
function closeServiceModal(){
  serviceModal.classList.remove('active');
  serviceModal.setAttribute('aria-hidden','true');
  if(!modal.classList.contains('active'))document.body.classList.remove('modal-open');
}
document.querySelectorAll('.learn-more').forEach(l=>l.addEventListener('click',openService));
serviceClose.addEventListener('click',closeServiceModal);
serviceOverlay.addEventListener('click',closeServiceModal);
serviceEstimate.addEventListener('click',()=>{closeServiceModal();openModal();});
const form=document.getElementById('estimateForm');
const GOOGLE_SCRIPT_URL='https://script.google.com/macros/s/AKfycbwQQJdgxR5102dVXHzJKMIj_GI2wGW_ks0P8rouE-Ol61A0UnWJ9M2j6qoatwAda3q_KQ/exec';
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=form.querySelector('.submit-estimate');
  if(btn){btn.disabled=true;btn.innerHTML='SENDING REQUEST <span>→</span>';}
  if(!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('PASTE_YOUR_')){
    alert('The estimate form is not connected yet. Please add your Google Apps Script Web App URL in js/script.js.');
    if(btn){btn.disabled=false;btn.innerHTML='REQUEST FREE ESTIMATE <span>→</span>';}
    return;
  }
  try{
    const data=new URLSearchParams(new FormData(form));
    await fetch(GOOGLE_SCRIPT_URL,{method:'POST',mode:'no-cors',body:data});
    form.reset();
    if(btn){btn.disabled=false;btn.innerHTML='REQUEST SENT <span>✓</span>';}
    setTimeout(()=>{closeModal();if(btn)btn.innerHTML='REQUEST FREE ESTIMATE <span>→</span>';},1800);
  }catch(err){
    console.error(err);
    alert('Something went wrong. Please call 631-202-7770 instead.');
    if(btn){btn.disabled=false;btn.innerHTML='REQUEST FREE ESTIMATE <span>→</span>';}
  }
});
document.getElementById('year').textContent=new Date().getFullYear();

// TESTIMONIAL DETAIL MODALS
const reviewModal=document.getElementById('reviewModal');
const reviewClose=document.getElementById('closeReview');
const reviewOverlay=document.querySelector('.review-overlay');
const reviewAvatar=document.getElementById('reviewDetailAvatar');
const reviewName=document.getElementById('reviewDetailName');
const reviewMessage=document.getElementById('reviewDetailMessage');
const reviewPhotos=document.getElementById('reviewDetailPhotos');
const reviewData={
  kierven:{name:'Kierven',initial:'K',message:'“I’ve worked with Superior Construction Group on multiple projects and they continue to impress me every time. Their team is dependable, responsive, and committed to quality work. It’s rare to find a company that consistently delivers and stands behind their work. Highly recommended.”',images:['images/review-kierven.jpg']},
  bob:{name:'Bob',initial:'B',message:'“Had a great experience with Superior Construction Group. The team was easy to work with, kept me updated throughout the project, and delivered quality work on time. You can tell they care about doing the job right. Highly recommend if you’re looking for a reliable local construction company.”',images:[]},
  khurt:{name:'Khurt',initial:'K',message:'“I had a great experience working with Superior Construction Group. Their team was professional, responsive, and delivered quality work from start to finish. Communication was clear throughout the project, timelines were managed well, and  attention to detail really showed in the final result. They made the entire process smooth and stress-free. I highly recommend Superior Construction Group to anyone looking for reliable and high-quality construction services.”',images:['images/review-khurt.jpg']},
  romer:{name:'Romer',initial:'R',message:'“We hired Superior Construction Group for our home project and the experience was excellent from beginning to end. The team was professional, communicated clearly, and paid attention to every detail. They kept the work on schedule and delivered results that exceeded our expectations. It’s hard to find a contractor you can trust, and I would confidently recommend them to other homeowners.”',images:[]},
  celito:{name:'Celito',initial:'C',message:'“I had a positive experience communicating with Superior Construction Group. They were helpful, professional, and answered my questions promptly. Their website was easy to navigate, and they offer a wide range of construction services. If If you’re looking for a company to discuss your home improvement project, they’re definitely worth contacting.”',images:[]},
  aries:{name:'Aries',initial:'A',message:'“Excellent service and quality work from Superior Construction Group. Professional team, smooth process, and great communication. Highly recommended!”',images:[]}
};
function openReview(e){
  const key=e.currentTarget.dataset.review;
  const data=reviewData[key];
  if(!data)return;
  reviewAvatar.textContent=data.initial;
  reviewName.textContent=data.name.toUpperCase();
  reviewMessage.textContent=data.message;
  reviewPhotos.innerHTML=(data.images||[]).map(src=>`<img src="${src}" alt="Photo included with ${data.name}'s Google review">`).join('');
  if(data.note){reviewMessage.insertAdjacentHTML('afterend',`<p class="review-detail-note">${data.note}</p>`)}
  reviewModal.classList.add('active');
  reviewModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
function closeReviewModal(){
  reviewModal.classList.remove('active');
  reviewModal.setAttribute('aria-hidden','true');
  const note=reviewDetailMessage.parentElement.querySelector('.review-detail-note');
  if(note)note.remove();
  if(!serviceModal.classList.contains('active')&&!modal.classList.contains('active'))document.body.classList.remove('modal-open');
}
document.querySelectorAll('.testimonial-card').forEach(card=>{card.setAttribute('tabindex','0');card.setAttribute('role','button');card.addEventListener('click',openReview);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openReview({currentTarget:card})}})});
reviewClose.addEventListener('click',closeReviewModal);
reviewOverlay.addEventListener('click',closeReviewModal);


// OUR WORK CAROUSEL + IMAGE ZOOM
const workCarousel=document.getElementById('workCarousel');
const workCards=[...document.querySelectorAll('.work-card')];
const workPrev=document.querySelector('.work-prev');
const workNext=document.querySelector('.work-next');
const workLightbox=document.getElementById('workLightbox');
const workLightboxImage=document.getElementById('workLightboxImage');
const workLightboxCount=document.getElementById('workLightboxCount');
const closeWorkLightbox=document.getElementById('closeWorkLightbox');
const lightboxPrev=document.getElementById('lightboxPrev');
const lightboxNext=document.getElementById('lightboxNext');
let workIndex=0;
function scrollWork(direction){
  const amount=workCarousel.clientWidth*.78;
  workCarousel.scrollBy({left:direction*amount,behavior:'smooth'});
}
workPrev.addEventListener('click',()=>scrollWork(-1));
workNext.addEventListener('click',()=>scrollWork(1));
workCards.forEach((card,i)=>card.addEventListener('click',()=>openWorkLightbox(i)));
function updateWorkLightbox(){
  const card=workCards[workIndex];
  if(!card)return;
  workLightboxImage.src=card.dataset.image;
  workLightboxImage.alt=card.querySelector('img').alt;
  workLightboxCount.textContent=String(workIndex+1).padStart(2,'0')+' / '+String(workCards.length).padStart(2,'0');
}
function openWorkLightbox(index){
  workIndex=index;
  updateWorkLightbox();
  workLightbox.classList.add('active');
  workLightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
function closeWork(){
  workLightbox.classList.remove('active');
  workLightbox.setAttribute('aria-hidden','true');
  if(!reviewModal.classList.contains('active')&&!serviceModal.classList.contains('active')&&!modal.classList.contains('active'))document.body.classList.remove('modal-open');
}
function moveWorkLightbox(direction){
  workIndex=(workIndex+direction+workCards.length)%workCards.length;
  updateWorkLightbox();
}
closeWorkLightbox.addEventListener('click',closeWork);
workLightbox.querySelector('.work-lightbox-overlay').addEventListener('click',closeWork);
lightboxPrev.addEventListener('click',()=>moveWorkLightbox(-1));
lightboxNext.addEventListener('click',()=>moveWorkLightbox(1));
// Mouse drag support for desktop
let workDragging=false,workDragStartX=0,workScrollStart=0;
workCarousel.addEventListener('pointerdown',e=>{if(e.target.closest('.work-card'))return;workDragging=true;workDragStartX=e.clientX;workScrollStart=workCarousel.scrollLeft;workCarousel.classList.add('dragging')});
window.addEventListener('pointermove',e=>{if(!workDragging)return;workCarousel.scrollLeft=workScrollStart-(e.clientX-workDragStartX)});
window.addEventListener('pointerup',()=>{workDragging=false;workCarousel.classList.remove('dragging')});
// Extend Escape / keyboard navigation for the work lightbox
const oldKeydownHandler=document._unusedWorkKeydown;
document.addEventListener('keydown',e=>{
  if(!workLightbox.classList.contains('active'))return;
  if(e.key==='Escape')closeWork();
  if(e.key==='ArrowLeft')moveWorkLightbox(-1);
  if(e.key==='ArrowRight')moveWorkLightbox(1);
});
