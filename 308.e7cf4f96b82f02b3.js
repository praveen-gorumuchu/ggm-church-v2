"use strict";(self.webpackChunkggm_church=self.webpackChunkggm_church||[]).push([[308],{3308:(Te,O,a)=>{a.r(O),a.d(O,{BibleModule:()=>Fe});var m=a(177),N=a(8498),z=a(5717),b=a(7760),Y=a(1654),d=a(9417),C=a(850),g=a(6464),e=a(3953);let X=(()=>{class s{constructor(){}searchBook(t){const n=t.match(/^(.*?)\s*[\s,:;]?\s*(\d+)?\s*[\s,:;]?\s*(\d+)?$/);if(n){const[r,i,c,h]=n,p={bookName:i.trim()};return c&&(p.chapterNumber=parseInt(c,10)),h&&(p.verse=parseInt(h,10)),p}return null}static \u0275fac=function(o){return new(o||s)};static \u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();var _=a(9416),y=a(9172),V=a(6354),L=a(152),P=a(3294),G=a(5558),I=a(7673),u=a(4756);let U=(()=>{class s{dateFormat="M/d/yyyy";constructor(){}unSubscribeSubs(t){if(t&&t.length>u.Y.ZERO)for(const o of t)o.unsubscribe()}objKeysHasAtleastOneValue(t){let o=!1;const n=Object.keys(t).map(r=>t[r]);if(n&&n.length>u.Y.ZERO)for(const r of n){if(r&&""!==r.value&&null!=r.value){o=!0;break}o=!1}return o}removeItmesFromSorceArray(t,o,n){return t.length>u.Y.ZERO&&o.length>u.Y.ZERO&&n?t.filter(r=>!o.find(i=>r[n]===i[n])):t}removeInactiveItems(t){return t&&t.length>u.Y.ZERO?t.filter(o=>o.deletionFlag<=u.Y.ZERO):t}getHours(){const o=[...Array(25)].map((r,i)=>i).map((r,i)=>r<10?"0"+i:i.toString());return o.map(r=>parseInt(r)),o}generateYearsBetween(t=u.Y.TWO_THOUSAND,o=(new Date).getFullYear(),n){const r=o+u.Y.TWO;let i=[];for(var c=t;c<=r;c++)i.push(t),t++;return i}setFocus(t,o=u.Y.ZERO){t&&setTimeout(()=>t.focus(),o)}alphaNumericSort=(t,o)=>{const n=o&&""!==o;return t.filter(c=>n?""!==c[o]&&null!==c[o]:""!==c&&null!==c).sort((c,h)=>{const p=B=>!isNaN(parseFloat(B))&&isFinite(B);if(p(n?c[o]:c)&&p(n?h[o]:h))return parseFloat(n?c[o]:c)-parseFloat(n?c[o]:c);const k=n?c[o].match(/\d+|\D+/g):c.match(/\d+|\D+/g),v=n?h[o].match(/\d+|\D+/g):h.match(/\d+|\D+/g);let f=u.Y.ZERO,T=Math.min(k.length,v.length);for(;f<T&&k[f]===v[f];)f++;return f===T?k.length-v.length:k[f].toString().trim().toLowerCase().localeCompare(v[f].toString().trim().toLowerCase())})};filteredData(t,o,n){const r=this.alphaNumericSort(o,n);return t.valueChanges.pipe((0,y.Z)(""),(0,V.T)(i=>{if(null===i)return r.slice();{const c=typeof i===g.g.number?i.toString():i,h=typeof c===g.g.string?c:c[n||""];return h?this.filter(h,r,n):r.slice()}}))}filteredDataComesFirst(t,o,n,r,i,c){c&&this.removeInactiveItems(o),i&&(o=this.removeDuplicates(o,n));const h=r?this.alphaNumericSort(o,n):o;return t.valueChanges.pipe((0,y.Z)(""),(0,L.B)(u.Y.TWO_HUNDERED),(0,P.F)(),(0,G.n)(p=>{if(!p||""===p)return(0,I.of)(h.slice());{const k=typeof p===g.g.number?p.toString():p,f=this.filter((typeof k===g.g.string?k:k[n||""]).trim(),h,n);return h.filter(B=>!f.some($=>n&&""!==n?B[n]===$[n]:B===$)),(0,I.of)([...f])}}))}filterBooks(t,o,n){const r=o.slice();return t.valueChanges.pipe((0,y.Z)(""),(0,G.n)(i=>{if(!i||""===i)return(0,I.of)(r);const h=(typeof i===g.g.number?i.toString():i).toString().trim().toLowerCase(),p=this.filterByTransliteration(h,r,n);return(0,I.of)(p.length>0?p:r)}))}filterByTransliteration(t,o,n){return o.filter(r=>r[n]?.some(i=>i.toLowerCase().includes(t)))}convertNumToArray(t){return Array.from({length:t},(o,n)=>n+1)}removeDuplicates(t,o){const n=new Set;return t.filter(r=>{const i=o&&""!==o?r[o]:r;return!n.has(i)&&(n.add(i),!0)})}hasDuplicates(t,o){const n=new Set;for(const r of t){const i=r[o];if(n.has(i))return!0;n.add(i)}return!1}filter(t,o,n){return o.filter(r=>n&&""!==n?r[n].toString().toLowerCase().includes(t.toString().trim().toLowerCase()):r.toString().toLowerCase().includes(t.toString().toLowerCase()))}sortAlphaNum=(t,o)=>t.toString().localeCompare(o.toString(),"en",{numeric:!0});convertBase64toUnitArray(t){const o=atob(t),n=new Array(o.length);for(let r=0;r<o.length;r++)n[r]=o.charCodeAt(r);return new Uint8Array(n)}formatBytes(t,o=u.Y.TWO){if(0===t)return"0 Bytes";const r=o<=0?0:o,c=Math.floor(Math.log(t)/Math.log(1024));return parseFloat((t/Math.pow(1024,c)).toFixed(r))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][c]}shortName=(t,o)=>t&&t.length>o&&t.substring(u.Y.ZERO,o)+"..."||t;generateUinqueId(t){const o=Date.now().toString();return`${t}-${Math.random().toString(36).substring(2,10)}-${o}`}static \u0275fac=function(o){return new(o||s)};static \u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();var S=a(8834),K=a(9213),Z=a(9631),R=a(6467),Q=a(6600);const H=["bookInput"],W=["chapterInput"],J=["verseInput"];function q(s,l){if(1&s&&(e.j41(0,"mat-option",18),e.EFF(1),e.k0s()),2&s){const t=l.$implicit;e.Y8G("value",t),e.R7$(),e.SpI(" ",t.name," ")}}function ee(s,l){if(1&s&&(e.j41(0,"mat-option",18),e.EFF(1),e.k0s()),2&s){const t=l.$implicit;e.Y8G("value",t),e.R7$(),e.SpI(" ",t," ")}}function te(s,l){if(1&s){const t=e.RV6();e.j41(0,"mat-form-field",19)(1,"input",20,2),e.bIt("blur",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.onBlurChapter())}),e.k0s(),e.j41(3,"mat-autocomplete",21,3),e.bIt("optionSelected",function(n){e.eBV(t);const r=e.XpG();return e.Njj(r.onChapterSelected(n.option.value))}),e.DNE(5,ee,2,2,"mat-option",12),e.nI1(6,"async"),e.k0s()()}if(2&s){const t=e.sdS(4),o=e.XpG();e.R7$(),e.Y8G("matAutocomplete",t),e.R7$(4),e.Y8G("ngForOf",e.bMT(6,2,o.filteredChapters))}}function oe(s,l){if(1&s){const t=e.RV6();e.j41(0,"mat-form-field",22)(1,"input",23,4),e.bIt("keydown.enter",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.onVerseSelected())})("change",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.onVerseSelected())})("blur",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.onBlurVerse())}),e.k0s()()}}let A=(()=>{class s{searchBookService;bibleService;ngZone;utilSharedService;fb;currentBook;searchForm;filteredBooks;filteredChapters;bibleBooks=[];chapterList=[];isBookSelected=!1;isChapterSelected=!1;subs=[];bookInput;chapterInput;verseInput;booksAutoComplete;chaptersAutoComplete;keydownListener;constructor(t,o,n,r,i){this.searchBookService=t,this.bibleService=o,this.ngZone=n,this.utilSharedService=r,this.fb=i,this.searchForm=this.createFormGroup()}ngOnInit(){this.subs.push(this.bibleService.bibleBooksObsCast.subscribe(t=>{this.ngZone.run(()=>{this.bibleBooks=this.combineBibleBooks(t)})})),this.keydownListener=this.onKeydown.bind(this),window.addEventListener("keydown",this.keydownListener),this.getFilteredOptions(),this.getChapterLis()}ngOnChanges(t){}populateDeafult(){this.book.patchValue(this.currentBook),this.chapter.patchValue(1),this.verse.patchValue(1)}getChapterLis(){this.chapterList=this.utilSharedService.convertNumToArray(this.currentBook.chapters.length)}onSearchChange(t){}getFilteredOptions(){this.filteredBooks=this.utilSharedService.filterBooks(this.book,this.bibleBooks,g.g.TRANS),this.filteredChapters=this.utilSharedService.filteredDataComesFirst(this.chapter,this.chapterList)}clear(){this.resetInput()}defaultSelect(){}onBookSelected(t){this.chapter.reset(),this.verse.reset();const o=t.value;o?(this.bibleService.getBook(o.id),this.chapterList=Array.from({length:o.chapterCount},(n,r)=>r+1),this.isBookSelected=!0,this.filteredChapters=this.utilSharedService.filteredDataComesFirst(this.chapter,this.chapterList),setTimeout(()=>{this.chapterInput.nativeElement.focus()})):this.isBookSelected=!1}onChapterSelected(t){parseInt(this.chapter.value)<=this.chapterList.length?(this.isChapterSelected=!0,this.bibleService.setChapterIndex(this.chapter.value),setTimeout(()=>{this.verseInput.nativeElement.focus()})):this.isChapterSelected=!1}onBlurChapter(){parseInt(this.chapter.value)<=this.chapterList.length?(this.chapter.patchValue(this.chapter.value),this.onChapterSelected(this.chapter.value),this.chapter.setErrors(null)):this.chapter.touched&&this.chapter.value&&this.chapter.setErrors({inValid:!0}),this.searchForm.updateValueAndValidity()}onBlurVerse(){const t=parseInt(this.verse.value);t<=this.chapterList[this.chapter.value]?(this.chapter.patchValue(t),this.onVerseSelected(),this.verse.setErrors(null)):this.verse.touched&&this.verse.value&&this.verse.setErrors({inValid:!0}),this.searchForm.updateValueAndValidity()}onVerseSelected(){this.verse&&this.verse.value&&this.bibleService.setVerseIndex(this.verse.value)}displayFn(t){return t&&t.name?t.name:""}combineBibleBooks(t){return t.reduce((o,n)=>o.concat(n.books),[])}onSearchClick(){}prepareBookRequest(){const t=this.searchBookService.searchBook(this.book?.value.id);if(t&&t.bookName){const o=this.bibleBooks.find(n=>n.name.includes(t?.bookName));if(o&&o.id){const n=t&&t.chapterNumber&&Number(t.chapterNumber)||1,r=t&&t.verse&&Number(t.verse)||1;this.bibleService.getBook(o.id,!1,n,r),this.resetInput()}}}get isChapterError(){return this.chapter.hasError("inValid")}get book(){return this.searchForm.get("book")}get chapter(){return this.searchForm.get("chapter")}get verse(){return this.searchForm.get("verse")}resetInput(){this.searchForm&&this.searchForm.reset()}onKeydown(t){const{ctrlKey:o,key:n}=t;o&&"f"===n&&(t.preventDefault(),this.resetInput(),this.bookInput.nativeElement.focus())}createFormGroup(){return this.fb.group({book:["",[d.k0.required]],chapter:[""],verse:[""]})}ngOnDestroy(){window.removeEventListener("keydown",this.keydownListener),this.isBookSelected=!1,this.isChapterSelected=!1,this.bibleBooks=[]}static \u0275fac=function(o){return new(o||s)(e.rXU(X),e.rXU(_.c),e.rXU(e.SKi),e.rXU(U),e.rXU(d.ok))};static \u0275cmp=e.VBU({type:s,selectors:[["app-search-bar"]],viewQuery:function(o,n){if(1&o&&(e.GBs(H,5),e.GBs(W,5),e.GBs(J,5),e.GBs(C.pN,5),e.GBs(C.pN,5)),2&o){let r;e.mGM(r=e.lsd())&&(n.bookInput=r.first),e.mGM(r=e.lsd())&&(n.chapterInput=r.first),e.mGM(r=e.lsd())&&(n.verseInput=r.first),e.mGM(r=e.lsd())&&(n.booksAutoComplete=r.first),e.mGM(r=e.lsd())&&(n.chaptersAutoComplete=r.first)}},inputs:{currentBook:"currentBook"},features:[e.OA$],decls:18,vars:8,consts:[["bookInput",""],["booksAutoComplete","matAutocomplete"],["chapterInput",""],["chaptersAutoComplete","matAutocomplete"],["verseInput",""],[1,"search-sec","mr-3"],[1,"",3,"formGroup"],[1,"d-flex","search-fields"],["appearance","outline",1,"search-book","primary"],["matInput","","placeholder","Search book","formControlName","book",3,"keydown.enter","matAutocomplete"],["matPrefix",""],["autoActiveFirstOption","",3,"optionSelected","displayWith"],[3,"value",4,"ngFor","ngForOf"],["appearance","outline","class","search-chapter wt-15 ml-4 primary",4,"ngIf"],["appearance","outline","class","search-verse wt-10 ml-4 primary",4,"ngIf"],[1,"ml-2"],["mat-icon-button","","type","button",1,"clear-icon","ml-3",3,"click"],[1,"material-symbols-outlined"],[3,"value"],["appearance","outline",1,"search-chapter","wt-15","ml-4","primary"],["matInput","","placeholder","","formControlName","chapter",3,"blur","matAutocomplete"],["autoActiveFirstOption","",3,"optionSelected"],["appearance","outline",1,"search-verse","wt-10","ml-4","primary"],["matInput","","type","text","formControlName","verse",3,"keydown.enter","change","blur"]],template:function(o,n){if(1&o){const r=e.RV6();e.j41(0,"section",5)(1,"form",6)(2,"div",7)(3,"mat-form-field",8)(4,"input",9,0),e.bIt("keydown.enter",function(){return e.eBV(r),e.Njj(n.onSearchClick())}),e.k0s(),e.j41(6,"mat-icon",10),e.EFF(7,"search"),e.k0s(),e.j41(8,"mat-autocomplete",11,1),e.bIt("optionSelected",function(c){return e.eBV(r),e.Njj(n.onBookSelected(c.option))}),e.DNE(10,q,2,2,"mat-option",12),e.nI1(11,"async"),e.k0s()(),e.DNE(12,te,7,4,"mat-form-field",13)(13,oe,3,0,"mat-form-field",14),e.j41(14,"div",15)(15,"button",16),e.bIt("click",function(){return e.eBV(r),e.Njj(n.clear())}),e.j41(16,"span",17),e.EFF(17," close "),e.k0s()()()()()()}if(2&o){const r=e.sdS(9);e.R7$(),e.Y8G("formGroup",n.searchForm),e.R7$(3),e.Y8G("matAutocomplete",r),e.R7$(4),e.Y8G("displayWith",n.displayFn),e.R7$(2),e.Y8G("ngForOf",e.bMT(11,6,n.filteredBooks)),e.R7$(2),e.Y8G("ngIf",(null==n.book?null:n.book.value)&&n.isBookSelected||!0),e.R7$(),e.Y8G("ngIf",(null==n.book?null:n.book.value)&&n.isBookSelected&&(null==n.chapter?null:n.chapter.value)&&n.isChapterSelected||!0)}},dependencies:[m.Sq,m.bT,S.iY,K.An,Z.fg,R.rl,R.JW,d.qT,d.me,d.BC,d.cb,d.j4,d.JD,C.$3,Q.wT,C.pN,m.Jj],styles:[".search-sec .primary input{color:#b3b3b3!important}  .--mat-form-field-container-height{min-height:40px!important}  .mat-mdc-form-field-infix{padding:10px 0!important}  .mat-mdc-text-field-wrapper{height:46px!important}  .mat-mdc-form-field-icon-prefix>.mat-icon{padding-bottom:10px!important}  mat-icon{cursor:pointer}@media screen and (max-width: 768px){  .search-fields{flex-wrap:wrap;justify-content:flex-start;margin-bottom:18px}  .search-chapter{margin-left:0!important}  .search-book{width:100%}  .search-chapter{width:35%}  .search-verse{width:30%}}"]})}return s})();var x=a(3783),M=a(1537);let E=(()=>{class s{breakpointService;fontSize=42;constructor(t){this.breakpointService=t,this.breakpointService.isMobile$.subscribe(o=>{o&&(this.fontSize=24)})}zoomIn(){this.fontSize+=2,this.updateFontSize()}zoomOut(){this.fontSize>16&&(this.fontSize-=2,this.updateFontSize())}reset(){this.fontSize=42,this.updateFontSize()}updateFontSize(){const t=document.getElementById("zoom-container");t&&t.setAttribute("style",`font-size: ${this.fontSize}px`)}static \u0275fac=function(o){return new(o||s)(e.KVO(M.d))};static \u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})(),ne=(()=>{class s{zoomService;toggleDrawer=new e.bkB;highlightedTexts=[];constructor(t){this.zoomService=t}shortcuts={zoomIn:t=>{t.preventDefault(),this.zoomService.zoomIn()},zoomOut:t=>{t.preventDefault(),this.zoomService.zoomOut()},undo:t=>{},toggleMenu:t=>{t.preventDefault(),this.toggleDrawer.emit()}};onKeydown(t){const{ctrlKey:o,metaKey:n,key:r}=t;!o&&!n||"+"!==r&&"="!==r?(o||n)&&"-"===r?this.shortcuts.zoomOut(t):(o||n)&&"z"===r?this.shortcuts.undo(t):(o||n)&&"m"===r&&this.shortcuts.toggleMenu(t):this.shortcuts.zoomIn(t)}static \u0275fac=function(o){return new(o||s)(e.KVO(E))};static \u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();var j=a(958),D=a(9183),F=a(5596);const re=s=>({active:s});function se(s,l){if(1&s){const t=e.RV6();e.j41(0,"li",3)(1,"button",4),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG();return e.Njj(r.onChapterClick(n))}),e.j41(2,"span"),e.EFF(3),e.k0s()()()}if(2&s){const t=l.$implicit,o=l.index,n=e.XpG();e.R7$(),e.Y8G("ngClass",e.eq3(2,re,n.isActive(t))),e.R7$(2),e.SpI(" ",o+1," ")}}let ie=(()=>{class s{bibleService;currentBook;currentChapterIndex=1;currentChapter=new e.bkB;isActiveChapter;constructor(t){this.bibleService=t}ngOnInit(){}ngOnChanges(t){this.isActiveChapter=this.currentBook.chapters[this.currentChapterIndex-1]}isActive(t){return this.isActiveChapter?.id?.toLowerCase()===t.id.toLowerCase()}onChapterClick(t){this.isActiveChapter=t;let o=t.name.match(/\d+$/);this.bibleService.setChapterIndex(o?parseInt(o[0]):1),this.currentChapter.emit(t)}static \u0275fac=function(o){return new(o||s)(e.rXU(_.c))};static \u0275cmp=e.VBU({type:s,selectors:[["app-chapters"]],inputs:{currentBook:"currentBook",currentChapterIndex:"currentChapterIndex"},outputs:{currentChapter:"currentChapter"},features:[e.OA$],decls:5,vars:1,consts:[[1,"chapter-list"],[1,"m-0","p-0"],["class"," book-list",4,"ngFor","ngForOf"],[1,"book-list"],["mat-icon-button","",1,"chapter-num",3,"click","ngClass"]],template:function(o,n){1&o&&(e.j41(0,"section",0)(1,"mat-card")(2,"mat-card-content")(3,"ul",1),e.DNE(4,se,4,4,"li",2),e.k0s()()()()),2&o&&(e.R7$(4),e.Y8G("ngForOf",n.currentBook.chapters))},dependencies:[m.YU,m.Sq,S.iY,F.RN,F.m2],styles:[".chapter-list mat-card{background:#e1e1e1}  .chapter-list mat-card mat-card-content ul{list-style:none;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-items:stretch;align-content:stretch}  .chapter-list mat-card mat-card-content ul li{padding:0;margin:5px}  .chapter-list mat-card mat-card-content ul li .chapter-num{color:#1c222e;font-size:14px;font-weight:600}  .chapter-list mat-card mat-card-content ul li .chapter-num.active{background-color:#1c222e;color:#e3e3e3}  .chapter-list mat-card mat-card-content ul li .mat-mdc-icon-button .mat-mdc-button-touch-target{width:28px;height:28px}"]})}return s})();var ce=a(3726);function ae(s,l){if(1&s){const t=e.RV6();e.j41(0,"div",8)(1,"button",9),e.bIt("click",function(){e.eBV(t);const n=e.XpG(2);return e.Njj(n.onChangeChapter(n.action.PREV))}),e.j41(2,"span",10),e.EFF(3," arrow_back_ios "),e.k0s()()()}2&s&&(e.R7$(),e.Y8G("disabled",!1))}function le(s,l){if(1&s){const t=e.RV6();e.j41(0,"div",11)(1,"button",9),e.bIt("click",function(){e.eBV(t);const n=e.XpG(2);return e.Njj(n.onChangeChapter(n.action.NEXT))}),e.j41(2,"span",10),e.EFF(3," arrow_forward_ios "),e.k0s()()()}2&s&&(e.R7$(),e.Y8G("disabled",!1))}function he(s,l){if(1&s){const t=e.RV6();e.j41(0,"div",12)(1,"button",9),e.bIt("click",function(){e.eBV(t);const n=e.XpG(2);return e.Njj(n.onChangeChapter(n.action.NEXT))}),e.j41(2,"span",10),e.EFF(3," arrow_forward_ios "),e.k0s()()()}2&s&&(e.R7$(),e.Y8G("disabled",!1))}function pe(s,l){if(1&s){const t=e.RV6();e.j41(0,"div",13)(1,"button",9),e.bIt("click",function(){e.eBV(t);const n=e.XpG(2);return e.Njj(n.onChangeChapter(n.action.NEXT))}),e.j41(2,"span",10),e.EFF(3," arrow_forward_ios "),e.k0s()()()}2&s&&(e.R7$(),e.Y8G("disabled",!1))}function ue(s,l){if(1&s&&(e.j41(0,"section",3),e.DNE(1,ae,4,1,"div",4)(2,le,4,1,"div",5)(3,he,4,1,"div",6)(4,pe,4,1,"div",7),e.k0s()),2&s){const t=e.XpG();e.R7$(),e.Y8G("ngIf",t.showLeftArrow),e.R7$(),e.Y8G("ngIf",t.showRightArrow),e.R7$(),e.Y8G("ngIf",t.showDownArrow),e.R7$(),e.Y8G("ngIf",t.showUpArrow)}}function me(s,l){if(1&s){const t=e.RV6();e.j41(0,"div",14)(1,"button",15),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.scrollToTop())}),e.j41(2,"span",10),e.EFF(3," keyboard_arrow_up "),e.k0s()()()}}let de=(()=>{class s{ngZone;bookMarkService;sharedService;bibleService;breakpointService;changeChapter=new e.bkB;disableNext=!1;disablePrev=!1;action=b.R;showLeftArrow;showRightArrow;showUpArrow;showDownArrow;showScrollArrow=!1;scrollSubscription;subs=[];isMobile=!1;constructor(t,o,n,r,i){this.ngZone=t,this.bookMarkService=o,this.sharedService=n,this.bibleService=r,this.breakpointService=i,this.subs.push(this.breakpointService.isMobile$.subscribe(c=>{c&&(this.isMobile=!0)}))}ngOnInit(){this.ngZone.runOutsideAngular(()=>{window.addEventListener("keydown",this.handleKeyDown.bind(this))}),this.showScroll()}showScroll(){const t=document.getElementById("contentBlock");t&&(this.scrollSubscription=(0,ce.R)(t,"scroll").pipe((0,V.T)(()=>t.scrollTop)).subscribe(o=>{this.showScrollArrow=o>180}))}scrollToTop(){const t=document.getElementById("contentBlock");t&&t.scrollTo({top:0,behavior:"smooth"})}onMouseMove(t){const{clientX:o}=t,n=window.innerWidth;this.showLeftArrow=o<60,this.showRightArrow=o>n-60}handleKeyDown(t){if(t.ctrlKey&&t.shiftKey)switch(t.preventDefault(),t.stopPropagation(),t.key){case"ArrowRight":this.ngZone.run(()=>{this.onChangeChapter(b.R.NEXT)});break;case"ArrowLeft":this.ngZone.run(()=>{this.onChangeChapter(b.R.PREV)});break;case"ArrowUp":this.ngZone.run(()=>{this.onChangeChapter(b.R.UP)});break;case"ArrowDown":this.ngZone.run(()=>{this.onChangeChapter(b.R.DOWN)})}}onChangeChapter(t){this.changeChapter.emit(t)}ngOnDestroy(){window.removeEventListener("keydown",this.handleKeyDown.bind(this)),this.scrollSubscription.unsubscribe(),this.sharedService.destroy(this.subs),this.isMobile=!1}static \u0275fac=function(o){return new(o||s)(e.rXU(e.SKi),e.rXU(j.s),e.rXU(x.d),e.rXU(_.c),e.rXU(M.d))};static \u0275cmp=e.VBU({type:s,selectors:[["app-quick-access"]],hostBindings:function(o,n){1&o&&e.bIt("mousemove",function(i){return n.onMouseMove(i)},!1,e.EBC)},inputs:{disableNext:"disableNext",disablePrev:"disablePrev"},outputs:{changeChapter:"changeChapter"},decls:4,vars:2,consts:[[1,"quick-access",3,"mousemove"],["class","navigation",4,"ngIf"],["class","bottom-acceess",4,"ngIf"],[1,"navigation"],["class","previous-chapter",4,"ngIf"],["class","next-chapter",4,"ngIf"],["class","next-book",4,"ngIf"],["class","prev-book",4,"ngIf"],[1,"previous-chapter"],["mat-icon-button","",3,"click","disabled"],[1,"material-symbols-outlined"],[1,"next-chapter"],[1,"next-book"],[1,"prev-book"],[1,"bottom-acceess"],["mat-icon-button","",1,"scroll-arrow",3,"click"]],template:function(o,n){1&o&&(e.j41(0,"section",0),e.bIt("mousemove",function(i){return n.onMouseMove(i)}),e.DNE(1,ue,5,4,"section",1),e.j41(2,"section"),e.DNE(3,me,4,0,"div",2),e.k0s()()),2&o&&(e.R7$(),e.Y8G("ngIf",!n.isMobile),e.R7$(2),e.Y8G("ngIf",n.showScrollArrow))},dependencies:[m.bT,S.iY],styles:[".quick-access .previous-chapter button,   .quick-access .next-chapter button,   .quick-access .bottom-acceess button{width:64px;height:64px;padding:0}  .quick-access .previous-chapter .material-symbols-outlined,   .quick-access .next-chapter .material-symbols-outlined,   .quick-access .bottom-acceess .material-symbols-outlined{color:#fff;font-size:32px;padding:0}  .quick-access .previous-chapter{position:fixed;top:50%;transform:translateY(-50%);left:15px}  .quick-access .next-chapter{position:fixed;top:50%;transform:translateY(-50%);right:15px}  .quick-access .bottom-acceess{position:fixed;bottom:25px;right:25px;transition:opacity .5s;opacity:.6}"]})}return s})();var w=a(9115);function fe(s,l){if(1&s){const t=e.RV6();e.qex(0),e.j41(1,"menu",12),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG();return e.Njj(r.onBookMarkClick(n))}),e.j41(2,"span"),e.EFF(3),e.k0s(),e.j41(4,"span"),e.EFF(5),e.k0s(),e.j41(6,"span"),e.EFF(7),e.k0s()(),e.bVm()}if(2&s){const t=l.$implicit,o=e.XpG();e.R7$(3),e.SpI(" ",t.bookName," : "),e.R7$(2),e.SpI(" ",o.getChapterNumber(t.chapterName)," : "),e.R7$(2),e.SpI(" ",t.verseId," ")}}let be=(()=>{class s{bookMarkService;bibleService;sharedService;ngZone;bookMarkList=[];menuTrigger;constructor(t,o,n,r){this.bookMarkService=t,this.bibleService=o,this.sharedService=n,this.ngZone=r}ngOnInit(){this.getBookMarks(),window.addEventListener("keydown",this.handleKeyDown.bind(this))}ngOnChanges(t){}openMenu(){this.menuTrigger.toggleMenu()}getBookMarks(){this.bookMarkService.bookMarksListObsCast.subscribe(t=>{const o=this.bookMarkService.getBookMarks();this.bookMarkList=this.bookMarkService.sortBookmarks(o)})}onBookMarkClick(t){this.bookMarkService.setBookMarkClicked(t),this.bibleService.getBook(t.currentBookId,!0)}getChapterNumber(t){return this.sharedService.getIndex(t)}deleteAll(){this.bookMarkService.clearAll(),this.bookMarkList=[]}onControlQ(){}handleKeyDown(t){t.ctrlKey&&"q"===t.key&&(t.preventDefault(),this.ngZone.run(()=>{this.openMenu()}))}ngOnDestroy(){window.removeEventListener("keydown",this.handleKeyDown.bind(this))}static \u0275fac=function(o){return new(o||s)(e.rXU(j.s),e.rXU(_.c),e.rXU(x.d),e.rXU(e.SKi))};static \u0275cmp=e.VBU({type:s,selectors:[["app-book-mark"]],viewQuery:function(o,n){if(1&o&&e.GBs(w.Cp,5),2&o){let r;e.mGM(r=e.lsd())&&(n.menuTrigger=r.first)}},features:[e.OA$],decls:17,vars:2,consts:[["menuTrigger",""],["aboveMenu","matMenu"],[1,"bottom-acceess"],["mat-icon-button","",1,"book-mark-btn",3,"matMenuTriggerFor"],[1,"material-symbols-outlined"],["yPosition","above"],[1,"d-flex","py-2","px-3","border-bottom","book-mark-title","justify-content-between","align-items-center"],[1,"book-mark-title"],[1,"m-0","title"],[1,"text-right"],["mat-icon-button","","color","warning",1,"delete-btn",3,"click"],[4,"ngFor","ngForOf"],["mat-menu-item","",3,"click"]],template:function(o,n){if(1&o){const r=e.RV6();e.j41(0,"section")(1,"div",2)(2,"button",3,0)(4,"span",4),e.EFF(5," bookmarks "),e.k0s()(),e.j41(6,"mat-menu",5,1)(8,"div",6)(9,"div",7)(10,"h4",8),e.EFF(11,"Recently Viewed"),e.k0s()(),e.j41(12,"div",9)(13,"button",10),e.bIt("click",function(){return e.eBV(r),e.Njj(n.deleteAll())}),e.j41(14,"span",4),e.EFF(15," delete "),e.k0s()()()(),e.DNE(16,fe,8,3,"ng-container",11),e.k0s()()()}if(2&o){const r=e.sdS(7);e.R7$(2),e.Y8G("matMenuTriggerFor",r),e.R7$(14),e.Y8G("ngForOf",n.bookMarkList)}},dependencies:[m.Sq,S.iY,w.kk,w.fb,w.Cp],styles:["button{background-color:transparent}  button .material-symbols-outlined{color:#bcbcbc;font-weight:600}  .mat-mdc-menu-panel{min-width:260px!important;max-width:360px!important;height:auto;min-height:280px;max-height:300px;padding-bottom:20px}  .mat-mdc-menu-content{padding:0!important}  .book-mark-title{background:#dcdcdc}  .delete-btn .material-symbols-outlined{color:#cd5c5c}  .mat-mdc-menu-panel{background:#1c222e!important}"]})}return s})();const ke=["verseContainer"];function ge(s,l){1&s&&(e.j41(0,"div",3),e.nrm(1,"mat-progress-spinner",4),e.k0s())}function ve(s,l){if(1&s&&(e.j41(0,"div",23)(1,"h2",24),e.EFF(2),e.k0s()()),2&s){const t=e.XpG(2);e.R7$(2),e.Lme(" ",t.currentBook.name,": ",t.currentChapterIndex," ")}}function Ce(s,l){if(1&s&&(e.j41(0,"h2",25)(1,"span"),e.EFF(2),e.k0s()()),2&s){const t=e.XpG(2);e.R7$(2),e.SpI("\u0c05\u0c27\u0c4d\u0c2f\u0c3e\u0c2f\u0c02: - ",t.currentChapterIndex,"")}}function _e(s,l){if(1&s){const t=e.RV6();e.qex(0),e.j41(1,"p",28,0)(3,"span",29),e.EFF(4),e.k0s(),e.j41(5,"span",30),e.bIt("mouseup",function(n){const r=e.eBV(t),i=r.$implicit,c=r.index,h=e.XpG(3);return e.Njj(h.onMouseUp(n,c,i))})("mousedown",function(n){const r=e.eBV(t),i=r.$implicit,c=r.index,h=e.XpG(3);return e.Njj(h.onMouseUp(n,c,i))}),e.EFF(6),e.k0s()(),e.bVm()}if(2&s){const t=l.$implicit,o=l.index;e.R7$(),e.Y8G("id","verse-"+o),e.R7$(3),e.SpI(" ",t.id.trim(),". "),e.R7$(2),e.SpI(" ",t.des," ")}}function Se(s,l){if(1&s&&(e.j41(0,"section",26),e.DNE(1,_e,7,3,"ng-container",27),e.k0s()),2&s){const t=e.XpG(2);e.R7$(),e.Y8G("ngForOf",t.currentChapter.verses)}}function Be(s,l){if(1&s){const t=e.RV6();e.j41(0,"section",5),e.bIt("scroll",function(n){e.eBV(t);const r=e.XpG();return e.Njj(r.onScroll(n))}),e.j41(1,"div",6)(2,"div",7)(3,"div",8),e.DNE(4,ve,3,2,"div",9),e.k0s()(),e.j41(5,"section",10)(6,"div",11)(7,"div",12),e.nrm(8,"app-search-bar",13),e.k0s(),e.j41(9,"div",14)(10,"button",15),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.zoom("+"))}),e.j41(11,"span",16),e.EFF(12," zoom_in "),e.k0s()(),e.j41(13,"button",15),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.zoom("-"))}),e.j41(14,"span",16),e.EFF(15," zoom_out "),e.k0s()(),e.j41(16,"button",15),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.zoom(""))}),e.j41(17,"span",16),e.EFF(18," restart_alt "),e.k0s()(),e.nrm(19,"app-book-mark"),e.k0s()(),e.j41(20,"app-chapters",17),e.bIt("currentChapter",function(n){e.eBV(t);const r=e.XpG();return e.Njj(r.getCurrentChapter(n))}),e.k0s()(),e.j41(21,"section",18)(22,"section",19),e.DNE(23,Ce,3,1,"h2",20),e.k0s(),e.DNE(24,Se,2,1,"section",21),e.k0s()(),e.j41(25,"app-quick-access",22),e.bIt("changeChapter",function(n){e.eBV(t);const r=e.XpG();return e.Njj(r.changeChapter(n))}),e.k0s()()}if(2&s){const t=e.XpG();e.R7$(4),e.Y8G("ngIf",t.isMobile),e.R7$(4),e.Y8G("currentBook",t.currentBook),e.R7$(12),e.Y8G("currentBook",t.currentBook)("currentChapterIndex",t.currentChapterIndex),e.R7$(3),e.Y8G("ngIf",!t.isMobile),e.R7$(),e.Y8G("ngIf",t.currentChapter&&t.currentChapter.verses.length>0),e.R7$(),e.Y8G("disableNext",t.currentChapterIndex>=t.currentBook.chapters.length)("disablePrev",t.currentChapterIndex-1<=0)}}const Ie=[{path:"",pathMatch:"full",redirectTo:"chapter"},{path:"chapter",component:(()=>{class s{bibleService;sharedService;zoomService;keyboardShortcutsService;bookMarkService;breakpointService;currentBook;type=z.w;currentChapterIndex=1;currentChapter;subscriptions=[];isLoading;isMobile=!1;currentVerse=1;searchComponent;verseContainers;constructor(t,o,n,r,i,c){this.bibleService=t,this.sharedService=o,this.zoomService=n,this.keyboardShortcutsService=r,this.bookMarkService=i,this.breakpointService=c,this.isLoading=!0,this.bibleService.getBook(Y.C.BOOK_1)}ngOnInit(){this.getBibleBooks(),this.getScreen()}getScreen(){this.subscriptions.push(this.breakpointService.isMobile$.subscribe(t=>{this.isMobile=t}))}ngAfterViewInit(){}onScroll(t){const o=t.target.scrollTop,n=document.getElementById("app-header");n&&(o>320?(n.classList.add("sticky"),this.bibleService.setBibleState({showBook:!0,showChapter:!0,showVerses:!0})):(n.classList.remove("sticky"),this.bibleService.setBibleState({showBook:!0,showChapter:!1,showVerses:!1})))}zoom(t){"+"===t?this.zoomService.zoomIn():"-"===t?this.zoomService.zoomOut():this.zoomService.reset()}getBibleBooks(){this.subscriptions.push(this.bibleService.currentBookObsCast.subscribe(t=>{this.isLoading=!1,this.currentBook=t,t.isBookMark||(this.currentChapter=this.currentBook.chapters[0]),this.bibleService.setBibleState({showBook:!0})},()=>this.isLoading=!1),this.bibleService.chapterIndexObsCast.subscribe(t=>{this.currentChapterIndex=t,this.getCurrentChapter(this.currentBook.chapters[this.currentChapterIndex-1]),console.log(this.currentChapter,this.currentChapterIndex)}),this.bibleService.currentVerseIndexObsCast.subscribe(t=>{this.currentVerse=t,this.scrollToVerse(this.currentVerse)}))}changeChapter(t){this.searchComponent.resetInput();const o=this.sharedService.getBookId(this.currentBook.id,t);switch(t){case b.R.NEXT:this.currentChapterIndex>=this.currentBook.chapters.length?this.callToNewBook(t):(this.currentChapter=this.currentBook.chapters[this.currentChapterIndex],this.currentChapterIndex++);break;case b.R.PREV:this.currentChapterIndex>1?(this.currentChapterIndex--,this.currentChapter=this.currentBook.chapters[this.currentChapterIndex-1]):this.callToNewBook(t);break;case b.R.DOWN:case b.R.UP:this.bibleService.getBook(o),this.resetDefaults()}this.bibleService.setChapterIndex(this.currentChapterIndex)}callToNewBook(t){this.resetDefaults(),this.isLoading=!0;const o=this.sharedService.getBookId(this.currentBook.id,t);this.bibleService.getBook(o)}resetDefaults(){this.currentChapterIndex=1,this.bibleService.setChapterIndex(1),this.currentVerse=1,this.bibleService.setVerseIndex(1),this.searchComponent.resetInput()}getCurrentChapter(t){this.currentChapter=t,this.bibleService.setBibleState({showBook:!0,showChapter:!1})}resetForm(){this.searchComponent.chapter.reset(),this.searchComponent.verse.reset()}onKeydown(t){!t.ctrlKey&&!t.metaKey||"+"!==t.key&&"="!==t.key?(t.ctrlKey||t.metaKey)&&"-"===t.key&&(t.preventDefault(),this.zoomService.zoomOut()):(t.preventDefault(),this.zoomService.zoomIn())}scrollToVerse(t){const o=this.verseContainers&&this.verseContainers.find((n,r)=>r===t-1);o&&o.nativeElement.scrollIntoView({behavior:"smooth",block:"start"})}onMouseUp(t,o,n){this.bookMarkService.storeBookMarks(n,this.currentChapter,this.currentBook)}ngOnDestroy(){this.bibleService.resetDeafualts(),this.sharedService.destroy(this.subscriptions),window.removeEventListener("keydown",this.onKeydown.bind(this)),this.isMobile=!1}static \u0275fac=function(o){return new(o||s)(e.rXU(_.c),e.rXU(x.d),e.rXU(E),e.rXU(ne),e.rXU(j.s),e.rXU(M.d))};static \u0275cmp=e.VBU({type:s,selectors:[["app-main"]],viewQuery:function(o,n){if(1&o&&(e.GBs(A,5),e.GBs(ke,5)),2&o){let r;e.mGM(r=e.lsd())&&(n.searchComponent=r.first),e.mGM(r=e.lsd())&&(n.verseContainers=r)}},hostBindings:function(o,n){1&o&&e.bIt("keydown",function(i){return n.onKeydown(i)},!1,e.tSv)},decls:2,vars:2,consts:[["verseContainer",""],["class","center",4,"ngIf"],["class","main-section mb-5 pb-5 bible-header","id","contentBlock",3,"scroll",4,"ngIf"],[1,"center"],["mode","indeterminate","value","50"],["id","contentBlock",1,"main-section","mb-5","pb-5","bible-header",3,"scroll"],[1,"container","pb-5","mb-5"],[1,"title"],[1,"row"],["class","col",4,"ngIf"],[1,"my-5","filter-section"],[1,"d-flex","justify-content-between","mb-3","px-2","filters-wrapper"],[1,"search-section"],[3,"currentBook"],[1,"zoom-features","d-flex","justify-content-end","mb-3","align-items-center"],["mat-icon-button","",3,"click"],[1,"material-symbols-outlined"],[3,"currentChapter","currentBook","currentChapterIndex"],[1,""],[1,"mt-5"],["class","text-center chapter-num",4,"ngIf"],["class","verse-sec section-gap","id","zoom-container",4,"ngIf"],[3,"changeChapter","disableNext","disablePrev"],[1,"col"],[1,"text-center","chapter-book","chapter-name","mobile-only"],[1,"text-center","chapter-num"],["id","zoom-container",1,"verse-sec","section-gap"],[4,"ngFor","ngForOf"],[1,"verses","d-flex",3,"id"],[1,"verse-index"],[1,"verse-val",3,"mouseup","mousedown"]],template:function(o,n){1&o&&e.DNE(0,ge,2,0,"div",1)(1,Be,26,8,"section",2),2&o&&(e.Y8G("ngIf",n.isLoading),e.R7$(),e.Y8G("ngIf",!n.isLoading&&n.currentChapter))},dependencies:[m.Sq,m.bT,S.iY,D.LG,ie,de,A,be],styles:[".main-section[_ngcontent-%COMP%]{margin-top:82px}.verse-sec[_ngcontent-%COMP%]{font-size:42px}.verse-sec[_ngcontent-%COMP%]   .verses[_ngcontent-%COMP%]{font-size:inherit;font-weight:500;margin:0 0 8px;line-height:1.6;color:#ccc}.verse-sec[_ngcontent-%COMP%]   .verses[_ngcontent-%COMP%]   .verse-val[_ngcontent-%COMP%]::selection, .verse-sec[_ngcontent-%COMP%]   .verses[_ngcontent-%COMP%]   .verse-index[_ngcontent-%COMP%]::selection{background:#fcde70!important;color:#1c222e!important}.verse-sec[_ngcontent-%COMP%]   .verses[_ngcontent-%COMP%]   .verse-val[_ngcontent-%COMP%]{margin-left:8px;display:inline-block}.chapter-num[_ngcontent-%COMP%]{font-size:32px;font-weight:500;color:#dcdcdc}.chapter-name[_ngcontent-%COMP%]{font-size:40px;color:#dcdcdc}.main-section[_ngcontent-%COMP%]{height:80vh;overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none}.zoom-features[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:5px}.zoom-features[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%]{color:#b3b3b3}@media screen and (max-width: 768px){.filter-section[_ngcontent-%COMP%]   .filters-wrapper[_ngcontent-%COMP%]{flex-direction:column}.verse-sec[_ngcontent-%COMP%]{font-size:24px}.chapter-name[_ngcontent-%COMP%]{font-size:20px}.search-section[_ngcontent-%COMP%]{flex-basis:auto}.zoom-features[_ngcontent-%COMP%]{justify-content:flex-start!important}}"]})}return s})()}];let we=(()=>{class s{static \u0275fac=function(o){return new(o||s)};static \u0275mod=e.$C({type:s});static \u0275inj=e.G2t({imports:[N.iI.forChild(Ie),N.iI]})}return s})();var ye=a(3887),xe=a(6665),Me=a(9888);const je=[D.D6,xe.vF,F.Hu,C.jL];let Fe=(()=>{class s{static \u0275fac=function(o){return new(o||s)};static \u0275mod=e.$C({type:s});static \u0275inj=e.G2t({imports:[m.MD,we,ye.G,d.YN,d.X1,Me.Pd,je]})}return s})()}}]);