"use strict";(self.webpackChunkggm_church=self.webpackChunkggm_church||[]).push([[64],{1064:(Y,F,p)=>{p.r(F),p.d(F,{BibleModule:()=>we});var k=p(177),E=p(9192),N=p(5717),C=p(7760),R=p(1654),g=p(9417),b=p(850),w=p(6464),e=p(3953);let V=(()=>{class r{constructor(){}searchBook(t){const n=t.match(/^(.*?)\s*[\s,:;]?\s*(\d+)?\s*[\s,:;]?\s*(\d+)?$/);if(n){const[i,d,v,j]=n,L={bookName:d.trim()};return v&&(L.chapterNumber=parseInt(v,10)),j&&(L.verse=parseInt(j,10)),L}return null}static \u0275fac=function(o){return new(o||r)};static \u0275prov=e.jDH({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})();var S=p(9416),z=p(9272),s=p(8834),c=p(9213),a=p(9631),l=p(2102),h=p(6600);const u=["bookInput"],_=["chapterInput"],f=["verseInput"];function I(r,m){if(1&r&&(e.j41(0,"mat-option",18),e.EFF(1),e.k0s()),2&r){const t=m.$implicit;e.Y8G("value",t),e.R7$(),e.SpI(" ",t.name," ")}}function y(r,m){if(1&r&&(e.j41(0,"mat-option",18),e.EFF(1),e.k0s()),2&r){const t=m.$implicit;e.Y8G("value",t),e.R7$(),e.SpI(" ",t," ")}}function M(r,m){if(1&r){const t=e.RV6();e.j41(0,"mat-form-field",19)(1,"input",20,2),e.bIt("blur",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.onBlurChapter())}),e.k0s(),e.j41(3,"mat-autocomplete",21,3),e.bIt("optionSelected",function(n){e.eBV(t);const i=e.XpG();return e.Njj(i.onChapterSelected(n.option.value))}),e.DNE(5,y,2,2,"mat-option",12),e.nI1(6,"async"),e.k0s()()}if(2&r){const t=e.sdS(4),o=e.XpG();e.R7$(),e.Y8G("matAutocomplete",t),e.R7$(4),e.Y8G("ngForOf",e.bMT(6,2,o.filteredChapters))}}function O(r,m){if(1&r){const t=e.RV6();e.j41(0,"mat-form-field",22)(1,"input",23,4),e.bIt("keydown.enter",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.onVerseSelected())})("change",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.onVerseSelected())})("blur",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.onBlurVerse())}),e.k0s()()}}let x=(()=>{class r{searchBookService;bibleService;ngZone;utilSharedService;fb;currentBook;searchForm;filteredBooks;filteredChapters;bibleBooks=[];chapterList=[];isBookSelected=!1;isChapterSelected=!1;subs=[];bookInput;chapterInput;verseInput;booksAutoComplete;chaptersAutoComplete;keydownListener;constructor(t,o,n,i,d){this.searchBookService=t,this.bibleService=o,this.ngZone=n,this.utilSharedService=i,this.fb=d,this.searchForm=this.createFormGroup()}ngOnInit(){this.subs.push(this.bibleService.bibleBooksObsCast.subscribe(t=>{this.ngZone.run(()=>{this.bibleBooks=this.combineBibleBooks(t)})})),this.keydownListener=this.onKeydown.bind(this),window.addEventListener("keydown",this.keydownListener),this.getFilteredOptions(),this.getChapterLis()}ngOnChanges(t){}populateDeafult(){this.book.patchValue(this.currentBook),this.chapter.patchValue(1),this.verse.patchValue(1)}getChapterLis(){this.chapterList=this.utilSharedService.convertNumToArray(this.currentBook.chapters.length)}onSearchChange(t){}getFilteredOptions(){this.filteredBooks=this.utilSharedService.filterBooks(this.book,this.bibleBooks,w.g.TRANS),this.filteredChapters=this.utilSharedService.filteredDataComesFirst(this.chapter,this.chapterList)}clear(){this.resetInput()}defaultSelect(){}onBookSelected(t){this.chapter.reset(),this.verse.reset();const o=t.value;o?(this.bibleService.getBook(o.id),this.chapterList=Array.from({length:o.chapterCount},(n,i)=>i+1),this.isBookSelected=!0,this.filteredChapters=this.utilSharedService.filteredDataComesFirst(this.chapter,this.chapterList),setTimeout(()=>{this.chapterInput.nativeElement.focus()})):this.isBookSelected=!1}onChapterSelected(t){parseInt(this.chapter.value)<=this.chapterList.length?(this.isChapterSelected=!0,this.bibleService.setChapterIndex(this.chapter.value),setTimeout(()=>{this.verseInput.nativeElement.focus()})):this.isChapterSelected=!1}onBlurChapter(){parseInt(this.chapter.value)<=this.chapterList.length?(this.chapter.patchValue(this.chapter.value),this.onChapterSelected(this.chapter.value),this.chapter.setErrors(null)):this.chapter.touched&&this.chapter.value&&this.chapter.setErrors({inValid:!0}),this.searchForm.updateValueAndValidity()}onBlurVerse(){const t=parseInt(this.verse.value);t<=this.chapterList[this.chapter.value]?(this.chapter.patchValue(t),this.onVerseSelected(),this.verse.setErrors(null)):this.verse.touched&&this.verse.value&&this.verse.setErrors({inValid:!0}),this.searchForm.updateValueAndValidity()}onVerseSelected(){this.verse&&this.verse.value&&this.bibleService.setVerseIndex(this.verse.value)}displayFn(t){return t&&t.name?t.name:""}combineBibleBooks(t){return t.reduce((o,n)=>o.concat(n.books),[])}onSearchClick(){}prepareBookRequest(){const t=this.searchBookService.searchBook(this.book?.value.id);if(t&&t.bookName){const o=this.bibleBooks.find(n=>n.name.includes(t?.bookName));if(o&&o.id){const n=t&&t.chapterNumber&&Number(t.chapterNumber)||1,i=t&&t.verse&&Number(t.verse)||1;this.bibleService.getBook(o.id,!1,n,i),this.resetInput()}}}get isChapterError(){return this.chapter.hasError("inValid")}get book(){return this.searchForm.get("book")}get chapter(){return this.searchForm.get("chapter")}get verse(){return this.searchForm.get("verse")}resetInput(){this.searchForm&&this.searchForm.reset()}onKeydown(t){const{ctrlKey:o,key:n}=t;o&&"f"===n&&(t.preventDefault(),this.resetInput(),this.bookInput.nativeElement.focus())}createFormGroup(){return this.fb.group({book:["",[g.k0.required]],chapter:[""],verse:[""]})}ngOnDestroy(){window.removeEventListener("keydown",this.keydownListener),this.isBookSelected=!1,this.isChapterSelected=!1,this.bibleBooks=[]}static \u0275fac=function(o){return new(o||r)(e.rXU(V),e.rXU(S.c),e.rXU(e.SKi),e.rXU(z.F),e.rXU(g.ok))};static \u0275cmp=e.VBU({type:r,selectors:[["app-search-bar"]],viewQuery:function(o,n){if(1&o&&(e.GBs(u,5),e.GBs(_,5),e.GBs(f,5),e.GBs(b.pN,5),e.GBs(b.pN,5)),2&o){let i;e.mGM(i=e.lsd())&&(n.bookInput=i.first),e.mGM(i=e.lsd())&&(n.chapterInput=i.first),e.mGM(i=e.lsd())&&(n.verseInput=i.first),e.mGM(i=e.lsd())&&(n.booksAutoComplete=i.first),e.mGM(i=e.lsd())&&(n.chaptersAutoComplete=i.first)}},inputs:{currentBook:"currentBook"},features:[e.OA$],decls:18,vars:8,consts:[["bookInput",""],["booksAutoComplete","matAutocomplete"],["chapterInput",""],["chaptersAutoComplete","matAutocomplete"],["verseInput",""],[1,"search-sec","mr-3"],[1,"",3,"formGroup"],[1,"d-flex","search-fields"],["appearance","outline",1,"search-book","primary"],["matInput","","placeholder","Search book","formControlName","book",3,"keydown.enter","matAutocomplete"],["matPrefix",""],["autoActiveFirstOption","",3,"optionSelected","displayWith"],[3,"value",4,"ngFor","ngForOf"],["appearance","outline","class","search-chapter wt-15 ml-4 primary",4,"ngIf"],["appearance","outline","class","search-verse wt-10 ml-4 primary",4,"ngIf"],[1,"ml-2"],["mat-icon-button","","type","button",1,"clear-icon","ml-3",3,"click"],[1,"material-symbols-outlined"],[3,"value"],["appearance","outline",1,"search-chapter","wt-15","ml-4","primary"],["matInput","","placeholder","Chapter","formControlName","chapter",3,"blur","matAutocomplete"],["autoActiveFirstOption","",3,"optionSelected"],["appearance","outline",1,"search-verse","wt-10","ml-4","primary"],["matInput","","placeholder","Verse","type","text","formControlName","verse",3,"keydown.enter","change","blur"]],template:function(o,n){if(1&o){const i=e.RV6();e.j41(0,"section",5)(1,"form",6)(2,"div",7)(3,"mat-form-field",8)(4,"input",9,0),e.bIt("keydown.enter",function(){return e.eBV(i),e.Njj(n.onSearchClick())}),e.k0s(),e.j41(6,"mat-icon",10),e.EFF(7,"search"),e.k0s(),e.j41(8,"mat-autocomplete",11,1),e.bIt("optionSelected",function(v){return e.eBV(i),e.Njj(n.onBookSelected(v.option))}),e.DNE(10,I,2,2,"mat-option",12),e.nI1(11,"async"),e.k0s()(),e.DNE(12,M,7,4,"mat-form-field",13)(13,O,3,0,"mat-form-field",14),e.j41(14,"div",15)(15,"button",16),e.bIt("click",function(){return e.eBV(i),e.Njj(n.clear())}),e.j41(16,"span",17),e.EFF(17," close "),e.k0s()()()()()()}if(2&o){const i=e.sdS(9);e.R7$(),e.Y8G("formGroup",n.searchForm),e.R7$(3),e.Y8G("matAutocomplete",i),e.R7$(4),e.Y8G("displayWith",n.displayFn),e.R7$(2),e.Y8G("ngForOf",e.bMT(11,6,n.filteredBooks)),e.R7$(2),e.Y8G("ngIf",(null==n.book?null:n.book.value)&&n.isBookSelected||!0),e.R7$(),e.Y8G("ngIf",(null==n.book?null:n.book.value)&&n.isBookSelected&&(null==n.chapter?null:n.chapter.value)&&n.isChapterSelected||!0)}},dependencies:[k.Sq,k.bT,s.iY,c.An,a.fg,l.rl,l.JW,h.wT,b.$3,b.pN,g.qT,g.me,g.BC,g.cb,g.j4,g.JD,k.Jj],styles:[".search-sec .primary input{color:#b3b3b3!important}  .--mat-form-field-container-height{min-height:40px!important}  .mat-mdc-form-field-infix{padding:10px 0!important}  .mat-mdc-text-field-wrapper{height:46px!important}  .mat-mdc-form-field-icon-prefix>.mat-icon{padding-bottom:10px!important}  mat-icon{cursor:pointer}@media screen and (max-width: 768px){  .search-fields{flex-wrap:wrap;justify-content:flex-start;margin-bottom:18px}  .search-chapter{margin-left:0!important}  .search-book{width:100%}  .search-chapter{width:35%}  .search-verse{width:30%}}"]})}return r})();var B=p(3783),A=p(1537);let X=(()=>{class r{breakpointService;fontSize=42;constructor(t){this.breakpointService=t,this.breakpointService.isMobile$.subscribe(o=>{o&&(this.fontSize=24)})}zoomIn(){this.fontSize+=2,this.updateFontSize()}zoomOut(){this.fontSize>16&&(this.fontSize-=2,this.updateFontSize())}reset(){this.fontSize=42,this.updateFontSize()}updateFontSize(){const t=document.getElementById("zoom-container");t&&t.setAttribute("style",`font-size: ${this.fontSize}px`)}static \u0275fac=function(o){return new(o||r)(e.KVO(A.d))};static \u0275prov=e.jDH({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})(),K=(()=>{class r{zoomService;toggleDrawer=new e.bkB;highlightedTexts=[];constructor(t){this.zoomService=t}shortcuts={zoomIn:t=>{t.preventDefault(),this.zoomService.zoomIn()},zoomOut:t=>{t.preventDefault(),this.zoomService.zoomOut()},undo:t=>{},toggleMenu:t=>{t.preventDefault(),this.toggleDrawer.emit()}};onKeydown(t){const{ctrlKey:o,metaKey:n,key:i}=t;!o&&!n||"+"!==i&&"="!==i?(o||n)&&"-"===i?this.shortcuts.zoomOut(t):(o||n)&&"z"===i?this.shortcuts.undo(t):(o||n)&&"m"===i&&this.shortcuts.toggleMenu(t):this.shortcuts.zoomIn(t)}static \u0275fac=function(o){return new(o||r)(e.KVO(X))};static \u0275prov=e.jDH({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})();var D=p(958),U=p(9183),G=p(5596);const Z=r=>({active:r});function Q(r,m){if(1&r){const t=e.RV6();e.j41(0,"li",3)(1,"button",4),e.bIt("click",function(){const n=e.eBV(t).$implicit,i=e.XpG();return e.Njj(i.onChapterClick(n))}),e.j41(2,"span"),e.EFF(3),e.k0s()()()}if(2&r){const t=m.$implicit,o=m.index,n=e.XpG();e.R7$(),e.Y8G("ngClass",e.eq3(2,Z,n.isActive(t))),e.R7$(2),e.SpI(" ",o+1," ")}}let W=(()=>{class r{bibleService;currentBook;currentChapterIndex=1;currentChapter=new e.bkB;isActiveChapter;constructor(t){this.bibleService=t}ngOnInit(){}ngOnChanges(t){this.isActiveChapter=this.currentBook.chapters[this.currentChapterIndex-1]}isActive(t){return this.isActiveChapter?.id?.toLowerCase()===t.id.toLowerCase()}onChapterClick(t){this.isActiveChapter=t;let o=t.name.match(/\d+$/);this.bibleService.setChapterIndex(o?parseInt(o[0]):1),this.currentChapter.emit(t)}static \u0275fac=function(o){return new(o||r)(e.rXU(S.c))};static \u0275cmp=e.VBU({type:r,selectors:[["app-chapters"]],inputs:{currentBook:"currentBook",currentChapterIndex:"currentChapterIndex"},outputs:{currentChapter:"currentChapter"},features:[e.OA$],decls:5,vars:1,consts:[[1,"chapter-list"],[1,"m-0","p-0"],["class"," book-list",4,"ngFor","ngForOf"],[1,"book-list"],["mat-icon-button","",1,"chapter-num",3,"click","ngClass"]],template:function(o,n){1&o&&(e.j41(0,"section",0)(1,"mat-card")(2,"mat-card-content")(3,"ul",1),e.DNE(4,Q,4,4,"li",2),e.k0s()()()()),2&o&&(e.R7$(4),e.Y8G("ngForOf",n.currentBook.chapters))},dependencies:[k.YU,k.Sq,s.iY,G.RN,G.m2],styles:[".chapter-list mat-card{background:#e1e1e1}  .chapter-list mat-card mat-card-content ul{list-style:none;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-items:stretch;align-content:stretch}  .chapter-list mat-card mat-card-content ul li{padding:0;margin:5px}  .chapter-list mat-card mat-card-content ul li .chapter-num{color:#1c222e;font-size:14px;font-weight:600}  .chapter-list mat-card mat-card-content ul li .chapter-num.active{background-color:#1c222e;color:#e3e3e3}  .chapter-list mat-card mat-card-content ul li .mat-mdc-icon-button .mat-mdc-button-touch-target{width:28px;height:28px}"]})}return r})();var H=p(3726),J=p(6354);function q(r,m){if(1&r){const t=e.RV6();e.j41(0,"div",8)(1,"button",9),e.bIt("click",function(){e.eBV(t);const n=e.XpG(2);return e.Njj(n.onChangeChapter(n.action.PREV))}),e.j41(2,"span",10),e.EFF(3," arrow_back_ios "),e.k0s()()()}2&r&&(e.R7$(),e.Y8G("disabled",!1))}function ee(r,m){if(1&r){const t=e.RV6();e.j41(0,"div",11)(1,"button",9),e.bIt("click",function(){e.eBV(t);const n=e.XpG(2);return e.Njj(n.onChangeChapter(n.action.NEXT))}),e.j41(2,"span",10),e.EFF(3," arrow_forward_ios "),e.k0s()()()}2&r&&(e.R7$(),e.Y8G("disabled",!1))}function te(r,m){if(1&r){const t=e.RV6();e.j41(0,"div",12)(1,"button",9),e.bIt("click",function(){e.eBV(t);const n=e.XpG(2);return e.Njj(n.onChangeChapter(n.action.NEXT))}),e.j41(2,"span",10),e.EFF(3," arrow_forward_ios "),e.k0s()()()}2&r&&(e.R7$(),e.Y8G("disabled",!1))}function oe(r,m){if(1&r){const t=e.RV6();e.j41(0,"div",13)(1,"button",9),e.bIt("click",function(){e.eBV(t);const n=e.XpG(2);return e.Njj(n.onChangeChapter(n.action.NEXT))}),e.j41(2,"span",10),e.EFF(3," arrow_forward_ios "),e.k0s()()()}2&r&&(e.R7$(),e.Y8G("disabled",!1))}function ne(r,m){if(1&r&&(e.j41(0,"section",3),e.DNE(1,q,4,1,"div",4)(2,ee,4,1,"div",5)(3,te,4,1,"div",6)(4,oe,4,1,"div",7),e.k0s()),2&r){const t=e.XpG();e.R7$(),e.Y8G("ngIf",t.showLeftArrow),e.R7$(),e.Y8G("ngIf",t.showRightArrow),e.R7$(),e.Y8G("ngIf",t.showDownArrow),e.R7$(),e.Y8G("ngIf",t.showUpArrow)}}function re(r,m){if(1&r){const t=e.RV6();e.j41(0,"div",14)(1,"button",15),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.scrollToTop())}),e.j41(2,"span",10),e.EFF(3," keyboard_arrow_up "),e.k0s()()()}}let se=(()=>{class r{ngZone;bookMarkService;sharedService;bibleService;breakpointService;changeChapter=new e.bkB;disableNext=!1;disablePrev=!1;action=C.R;showLeftArrow;showRightArrow;showUpArrow;showDownArrow;showScrollArrow=!1;scrollSubscription;subs=[];isMobile=!1;constructor(t,o,n,i,d){this.ngZone=t,this.bookMarkService=o,this.sharedService=n,this.bibleService=i,this.breakpointService=d,this.subs.push(this.breakpointService.isMobile$.subscribe(v=>{v&&(this.isMobile=!0)}))}ngOnInit(){this.ngZone.runOutsideAngular(()=>{window.addEventListener("keydown",this.handleKeyDown.bind(this))}),this.showScroll()}showScroll(){const t=document.getElementById("contentBlock");t&&(this.scrollSubscription=(0,H.R)(t,"scroll").pipe((0,J.T)(()=>t.scrollTop)).subscribe(o=>{this.showScrollArrow=o>180}))}scrollToTop(){const t=document.getElementById("contentBlock");t&&t.scrollTo({top:0,behavior:"smooth"})}onMouseMove(t){const{clientX:o}=t,n=window.innerWidth;this.showLeftArrow=o<60,this.showRightArrow=o>n-60}handleKeyDown(t){if(t.ctrlKey&&t.shiftKey)switch(t.preventDefault(),t.stopPropagation(),t.key){case"ArrowRight":this.ngZone.run(()=>{this.onChangeChapter(C.R.NEXT)});break;case"ArrowLeft":this.ngZone.run(()=>{this.onChangeChapter(C.R.PREV)});break;case"ArrowUp":this.ngZone.run(()=>{this.onChangeChapter(C.R.UP)});break;case"ArrowDown":this.ngZone.run(()=>{this.onChangeChapter(C.R.DOWN)})}}onChangeChapter(t){this.changeChapter.emit(t)}ngOnDestroy(){window.removeEventListener("keydown",this.handleKeyDown.bind(this)),this.scrollSubscription.unsubscribe(),this.sharedService.destroy(this.subs),this.isMobile=!1}static \u0275fac=function(o){return new(o||r)(e.rXU(e.SKi),e.rXU(D.s),e.rXU(B.d),e.rXU(S.c),e.rXU(A.d))};static \u0275cmp=e.VBU({type:r,selectors:[["app-quick-access"]],hostBindings:function(o,n){1&o&&e.bIt("mousemove",function(d){return n.onMouseMove(d)},!1,e.EBC)},inputs:{disableNext:"disableNext",disablePrev:"disablePrev"},outputs:{changeChapter:"changeChapter"},decls:4,vars:2,consts:[[1,"quick-access",3,"mousemove"],["class","navigation",4,"ngIf"],["class","bottom-acceess",4,"ngIf"],[1,"navigation"],["class","previous-chapter",4,"ngIf"],["class","next-chapter",4,"ngIf"],["class","next-book",4,"ngIf"],["class","prev-book",4,"ngIf"],[1,"previous-chapter"],["mat-icon-button","",3,"click","disabled"],[1,"material-symbols-outlined"],[1,"next-chapter"],[1,"next-book"],[1,"prev-book"],[1,"bottom-acceess"],["mat-icon-button","",1,"scroll-arrow",3,"click"]],template:function(o,n){1&o&&(e.j41(0,"section",0),e.bIt("mousemove",function(d){return n.onMouseMove(d)}),e.DNE(1,ne,5,4,"section",1),e.j41(2,"section"),e.DNE(3,re,4,0,"div",2),e.k0s()()),2&o&&(e.R7$(),e.Y8G("ngIf",!n.isMobile),e.R7$(2),e.Y8G("ngIf",n.showScrollArrow))},dependencies:[k.bT,s.iY],styles:[".quick-access .previous-chapter button,   .quick-access .next-chapter button,   .quick-access .bottom-acceess button{width:64px;height:64px;padding:0}  .quick-access .previous-chapter .material-symbols-outlined,   .quick-access .next-chapter .material-symbols-outlined,   .quick-access .bottom-acceess .material-symbols-outlined{color:#fff;font-size:32px;padding:0}  .quick-access .previous-chapter{position:fixed;top:50%;transform:translateY(-50%);left:15px}  .quick-access .next-chapter{position:fixed;top:50%;transform:translateY(-50%);right:15px}  .quick-access .bottom-acceess{position:fixed;bottom:25px;right:25px;transition:opacity .5s;opacity:.6}"]})}return r})();var $=p(9115),T=p(6665),P=p(6471);function ie(r,m){if(1&r){const t=e.RV6();e.j41(0,"mat-chip-option",13),e.bIt("click",function(){const n=e.eBV(t).$implicit,i=e.XpG(3);return e.Njj(i.onClick("book",n))}),e.j41(1,"span"),e.EFF(2),e.k0s(),e.j41(3,"span"),e.EFF(4),e.k0s(),e.j41(5,"span"),e.EFF(6),e.k0s()()}if(2&r){const t=m.$implicit,o=e.XpG(3);e.R7$(2),e.SpI(" ",t.bookName," : "),e.R7$(2),e.SpI(" ",o.getChapterNumber(t.chapterName)," : "),e.R7$(2),e.SpI(" ",t.verseId," ")}}function ce(r,m){if(1&r&&(e.qex(0),e.j41(1,"div",10)(2,"mat-chip-listbox",11),e.DNE(3,ie,7,3,"mat-chip-option",12),e.k0s()(),e.bVm()),2&r){const t=e.XpG(2);e.R7$(3),e.Y8G("ngForOf",t.dataSource.list)}}function ae(r,m){if(1&r&&(e.j41(0,"p",14),e.EFF(1),e.k0s()),2&r){const t=e.XpG(2);e.R7$(),e.SpI(" ",t.dataSource.noResult," ")}}function le(r,m){if(1&r){const t=e.RV6();e.j41(0,"section",2)(1,"div",3)(2,"div",4)(3,"h4",5),e.EFF(4),e.k0s()(),e.j41(5,"div",6)(6,"button",7),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.onClick("delete"))}),e.j41(7,"span",8),e.EFF(8," delete "),e.k0s()()()(),e.DNE(9,ce,4,1,"ng-container",9)(10,ae,2,1,"ng-template",null,0,e.C5r),e.k0s()}if(2&r){const t=e.sdS(11),o=e.XpG();e.R7$(4),e.SpI(" ",o.dataSource.title," "),e.R7$(5),e.Y8G("ngIf",o.dataSource.list&&(null==o.dataSource.list?null:o.dataSource.list.length)>0)("ngIfElse",t)}}let he=(()=>{class r{dataSource;bottomSheetRef;sharedService;constructor(t,o,n){this.dataSource=t,this.bottomSheetRef=o,this.sharedService=n}getChapterNumber(t){return this.sharedService.getIndex(t)}onClick(t,o){this.bottomSheetRef.dismiss({action:t,data:o})}close(){this.bottomSheetRef.dismiss({action:"close"})}static \u0275fac=function(o){return new(o||r)(e.rXU(T.yj),e.rXU(T.eN),e.rXU(B.d))};static \u0275cmp=e.VBU({type:r,selectors:[["app-bottom-sheet"]],decls:1,vars:1,consts:[["noResult",""],["class","bottom-sheet pb-5",4,"ngIf"],[1,"bottom-sheet","pb-5"],[1,"d-flex","py-3","px-4","border-bottom","justify-content-between","align-items-center"],[1,"title-section"],[1,"m-0","title"],[1,"text-right"],["mat-icon-button","","color","warning",1,"delete-btn",3,"click"],[1,"material-symbols-outlined"],[4,"ngIf","ngIfElse"],[1,"px-4","py-3"],[1,"mat-mdc-chip-set-stacked"],["class","",3,"click",4,"ngFor","ngForOf"],[1,"",3,"click"],[1,"text-center","mt-5"]],template:function(o,n){1&o&&e.DNE(0,le,12,3,"section",1),2&o&&e.Y8G("ngIf",n.dataSource)},dependencies:[k.Sq,k.bT,s.iY,P.uI,P.gq],styles:[".mat-bottom-sheet-container{padding:0!important}  .mat-bottom-sheet-container .mdc-evolution-chip-set{display:flex;flex-direction:row;justify-content:flex-start}  .mat-bottom-sheet-container .mdc-evolution-chip-set .mat-mdc-chip{width:40%;margin:10px}  .mat-bottom-sheet-container-medium,   .mat-bottom-sheet-container-large{max-width:calc(50vw - 128px)!important}  .mat-bottom-sheet-container{max-height:40vh!important}  .border-bottom{border-color:#e3e3e31f!important}@media screen and (max-width: 768px){  .mat-bottom-sheet-container .mdc-evolution-chip-set{flex-direction:row}  .mat-bottom-sheet-container .mdc-evolution-chip-set .mat-mdc-chip{width:100%!important}}"]})}return r})();function pe(r,m){if(1&r){const t=e.RV6();e.qex(0),e.j41(1,"menu",11),e.bIt("click",function(){const n=e.eBV(t).$implicit,i=e.XpG();return e.Njj(i.onBookMarkClick(n))}),e.j41(2,"span"),e.EFF(3),e.k0s(),e.j41(4,"span"),e.EFF(5),e.k0s(),e.j41(6,"span"),e.EFF(7),e.k0s()(),e.bVm()}if(2&r){const t=m.$implicit,o=e.XpG();e.R7$(3),e.SpI(" ",t.bookName," : "),e.R7$(2),e.SpI(" ",o.getChapterNumber(t.chapterName)," : "),e.R7$(2),e.SpI(" ",t.verseId," ")}}let ue=(()=>{class r{bookMarkService;bibleService;sharedService;ngZone;bottomSheet;bookMarkList=[];menuTrigger;constructor(t,o,n,i,d){this.bookMarkService=t,this.bibleService=o,this.sharedService=n,this.ngZone=i,this.bottomSheet=d}ngOnInit(){this.getBookMarks(),window.addEventListener("keydown",this.handleKeyDown.bind(this))}ngOnChanges(t){}openMenu(){this.menuTrigger.toggleMenu()}getBookMarks(){this.bookMarkService.bookMarksListObsCast.subscribe(t=>{const o=this.bookMarkService.getBookMarks();this.bookMarkList=this.bookMarkService.sortBookmarks(o)})}onBookMarkClick(t){this.bookMarkService.setBookMarkClicked(t),this.bibleService.getBook(t.currentBookId,!0)}getChapterNumber(t){return this.sharedService.getIndex(t)}deleteAll(){this.bookMarkService.clearAll(),this.bookMarkList=[]}onControlQ(){}handleKeyDown(t){t.ctrlKey&&"q"===t.key&&(t.preventDefault(),this.ngZone.run(()=>{this.openBottomSheet()}))}openBottomSheet(){this.bottomSheet.open(he,{data:{list:this.bookMarkList,title:w.g.RECENTLY_VIEWD,noResult:w.g.NO_BOOKMARKS_FOUND}}).afterDismissed().subscribe(o=>{o&&("book"===o.action&&this.onBookMarkClick(o.data),"delete"===o.action&&this.deleteAll())})}ngOnDestroy(){window.removeEventListener("keydown",this.handleKeyDown.bind(this))}static \u0275fac=function(o){return new(o||r)(e.rXU(D.s),e.rXU(S.c),e.rXU(B.d),e.rXU(e.SKi),e.rXU(T.VK))};static \u0275cmp=e.VBU({type:r,selectors:[["app-book-mark"]],viewQuery:function(o,n){if(1&o&&e.GBs($.Cp,5),2&o){let i;e.mGM(i=e.lsd())&&(n.menuTrigger=i.first)}},features:[e.OA$],decls:16,vars:1,consts:[["aboveMenu","matMenu"],[1,"bottom-acceess"],["yPosition","above"],[1,"d-flex","py-2","px-3","border-bottom","book-mark-title","justify-content-between","align-items-center"],[1,"book-mark-title"],[1,"m-0","title"],[1,"text-right"],["mat-icon-button","","color","warning",1,"delete-btn",3,"click"],[1,"material-symbols-outlined"],[4,"ngFor","ngForOf"],["mat-icon-button","",1,"book-mark-btn",3,"click"],["mat-menu-item","",3,"click"]],template:function(o,n){if(1&o){const i=e.RV6();e.j41(0,"section")(1,"div",1)(2,"mat-menu",2,0)(4,"div",3)(5,"div",4)(6,"h4",5),e.EFF(7,"Recently Viewed"),e.k0s()(),e.j41(8,"div",6)(9,"button",7),e.bIt("click",function(){return e.eBV(i),e.Njj(n.deleteAll())}),e.j41(10,"span",8),e.EFF(11," delete "),e.k0s()()()(),e.DNE(12,pe,8,3,"ng-container",9),e.k0s()(),e.j41(13,"button",10),e.bIt("click",function(){return e.eBV(i),e.Njj(n.openBottomSheet())}),e.j41(14,"span",8),e.EFF(15," bookmarks "),e.k0s()()()}2&o&&(e.R7$(12),e.Y8G("ngForOf",n.bookMarkList))},dependencies:[k.Sq,s.iY,$.kk,$.fb],styles:[".bottom-acceess button{background-color:transparent}  .bottom-acceess button .material-symbols-outlined{color:#bcbcbc;font-weight:600}  .mat-mdc-menu-panel{min-width:260px!important;max-width:360px!important;height:auto;min-height:280px;max-height:300px;padding-bottom:20px}  .mat-mdc-menu-content{padding:0!important}  .book-mark-title{background:#dcdcdc}  .delete-btn .material-symbols-outlined{color:#cd5c5c}  .mat-mdc-menu-panel{background:#1c222e!important}"]})}return r})();const me=["verseContainer"];function de(r,m){1&r&&(e.j41(0,"div",3),e.nrm(1,"mat-progress-spinner",4),e.k0s())}function fe(r,m){if(1&r&&(e.j41(0,"div",23)(1,"h2",24),e.EFF(2),e.k0s()()),2&r){const t=e.XpG(2);e.R7$(2),e.Lme(" ",t.currentBook.name,": ",t.currentChapterIndex," ")}}function be(r,m){if(1&r&&(e.j41(0,"h2",25)(1,"span"),e.EFF(2),e.k0s()()),2&r){const t=e.XpG(2);e.R7$(2),e.SpI("\u0c05\u0c27\u0c4d\u0c2f\u0c3e\u0c2f\u0c02: - ",t.currentChapterIndex,"")}}function ke(r,m){if(1&r){const t=e.RV6();e.qex(0),e.j41(1,"p",28,0)(3,"span",29),e.EFF(4),e.k0s(),e.j41(5,"span",30),e.bIt("mouseup",function(n){const i=e.eBV(t),d=i.$implicit,v=i.index,j=e.XpG(3);return e.Njj(j.onMouseUp(n,v,d))})("mousedown",function(n){const i=e.eBV(t),d=i.$implicit,v=i.index,j=e.XpG(3);return e.Njj(j.onMouseUp(n,v,d))}),e.EFF(6),e.k0s()(),e.bVm()}if(2&r){const t=m.$implicit,o=m.index;e.R7$(),e.Y8G("id","verse-"+o),e.R7$(3),e.SpI(" ",t.id.trim(),". "),e.R7$(2),e.SpI(" ",t.des," ")}}function _e(r,m){if(1&r&&(e.j41(0,"section",26),e.DNE(1,ke,7,3,"ng-container",27),e.k0s()),2&r){const t=e.XpG(2);e.R7$(),e.Y8G("ngForOf",t.currentChapter.verses)}}function ge(r,m){if(1&r){const t=e.RV6();e.j41(0,"section",5),e.bIt("scroll",function(n){e.eBV(t);const i=e.XpG();return e.Njj(i.onScroll(n))}),e.j41(1,"div",6)(2,"div",7)(3,"div",8),e.DNE(4,fe,3,2,"div",9),e.k0s()(),e.j41(5,"section",10)(6,"div",11)(7,"div",12),e.nrm(8,"app-search-bar",13),e.k0s(),e.j41(9,"div",14)(10,"button",15),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.zoom("+"))}),e.j41(11,"span",16),e.EFF(12," zoom_in "),e.k0s()(),e.j41(13,"button",15),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.zoom("-"))}),e.j41(14,"span",16),e.EFF(15," zoom_out "),e.k0s()(),e.j41(16,"button",15),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.zoom(""))}),e.j41(17,"span",16),e.EFF(18," restart_alt "),e.k0s()(),e.nrm(19,"app-book-mark"),e.k0s()(),e.j41(20,"app-chapters",17),e.bIt("currentChapter",function(n){e.eBV(t);const i=e.XpG();return e.Njj(i.getCurrentChapter(n))}),e.k0s()(),e.j41(21,"section",18)(22,"section",19),e.DNE(23,be,3,1,"h2",20),e.k0s(),e.DNE(24,_e,2,1,"section",21),e.k0s()(),e.j41(25,"app-quick-access",22),e.bIt("changeChapter",function(n){e.eBV(t);const i=e.XpG();return e.Njj(i.changeChapter(n))}),e.k0s()()}if(2&r){const t=e.XpG();e.R7$(4),e.Y8G("ngIf",t.isMobile),e.R7$(4),e.Y8G("currentBook",t.currentBook),e.R7$(12),e.Y8G("currentBook",t.currentBook)("currentChapterIndex",t.currentChapterIndex),e.R7$(3),e.Y8G("ngIf",!t.isMobile),e.R7$(),e.Y8G("ngIf",t.currentChapter&&t.currentChapter.verses.length>0),e.R7$(),e.Y8G("disableNext",t.currentChapterIndex>=t.currentBook.chapters.length)("disablePrev",t.currentChapterIndex-1<=0)}}const ve=[{path:"",pathMatch:"full",redirectTo:"chapter"},{path:"chapter",component:(()=>{class r{bibleService;sharedService;zoomService;keyboardShortcutsService;bookMarkService;breakpointService;currentBook;type=N.w;currentChapterIndex=1;currentChapter;subscriptions=[];isLoading;isMobile=!1;currentVerse=1;searchComponent;verseContainers;constructor(t,o,n,i,d,v){this.bibleService=t,this.sharedService=o,this.zoomService=n,this.keyboardShortcutsService=i,this.bookMarkService=d,this.breakpointService=v,this.isLoading=!0,this.bibleService.getBook(R.C.BOOK_1)}ngOnInit(){this.getBibleBooks(),this.getScreen()}getScreen(){this.subscriptions.push(this.breakpointService.isMobile$.subscribe(t=>{this.isMobile=t}))}ngAfterViewInit(){}onScroll(t){const o=t.target.scrollTop,n=document.getElementById("app-header");n&&(o>320?(n.classList.add("sticky"),this.bibleService.setBibleState({showBook:!0,showChapter:!0,showVerses:!0})):(n.classList.remove("sticky"),this.bibleService.setBibleState({showBook:!0,showChapter:!1,showVerses:!1})))}zoom(t){"+"===t?this.zoomService.zoomIn():"-"===t?this.zoomService.zoomOut():this.zoomService.reset()}getBibleBooks(){this.subscriptions.push(this.bibleService.currentBookObsCast.subscribe(t=>{this.isLoading=!1,this.currentBook=t,t.isBookMark||(this.currentChapter=this.currentBook.chapters[0]),this.bibleService.setBibleState({showBook:!0})},()=>this.isLoading=!1),this.bibleService.chapterIndexObsCast.subscribe(t=>{this.currentChapterIndex=t,this.getCurrentChapter(this.currentBook.chapters[this.currentChapterIndex-1])}),this.bibleService.currentVerseIndexObsCast.subscribe(t=>{this.currentVerse=t,this.scrollToVerse(this.currentVerse)}))}changeChapter(t){this.searchComponent.resetInput();const o=this.sharedService.getBookId(this.currentBook.id,t);switch(t){case C.R.NEXT:this.currentChapterIndex>=this.currentBook.chapters.length?this.callToNewBook(t):(this.currentChapter=this.currentBook.chapters[this.currentChapterIndex],this.currentChapterIndex++);break;case C.R.PREV:this.currentChapterIndex>1?(this.currentChapterIndex--,this.currentChapter=this.currentBook.chapters[this.currentChapterIndex-1]):this.callToNewBook(t);break;case C.R.DOWN:case C.R.UP:this.bibleService.getBook(o),this.resetDefaults()}this.bibleService.setChapterIndex(this.currentChapterIndex)}callToNewBook(t){this.resetDefaults(),this.isLoading=!0;const o=this.sharedService.getBookId(this.currentBook.id,t);this.bibleService.getBook(o)}resetDefaults(){this.currentChapterIndex=1,this.bibleService.setChapterIndex(1),this.currentVerse=1,this.bibleService.setVerseIndex(1),this.searchComponent.resetInput()}getCurrentChapter(t){this.currentChapter=t,this.bibleService.setBibleState({showBook:!0,showChapter:!1})}resetForm(){this.searchComponent.chapter.reset(),this.searchComponent.verse.reset()}onKeydown(t){!t.ctrlKey&&!t.metaKey||"+"!==t.key&&"="!==t.key?(t.ctrlKey||t.metaKey)&&"-"===t.key&&(t.preventDefault(),this.zoomService.zoomOut()):(t.preventDefault(),this.zoomService.zoomIn())}scrollToVerse(t){const o=this.verseContainers&&this.verseContainers.find((n,i)=>i===t-1);o&&o.nativeElement.scrollIntoView({behavior:"smooth",block:"start"})}onMouseUp(t,o,n){this.bookMarkService.storeBookMarks(n,this.currentChapter,this.currentBook)}ngOnDestroy(){this.bibleService.resetDeafualts(),this.sharedService.destroy(this.subscriptions),window.removeEventListener("keydown",this.onKeydown.bind(this)),this.isMobile=!1}static \u0275fac=function(o){return new(o||r)(e.rXU(S.c),e.rXU(B.d),e.rXU(X),e.rXU(K),e.rXU(D.s),e.rXU(A.d))};static \u0275cmp=e.VBU({type:r,selectors:[["app-main"]],viewQuery:function(o,n){if(1&o&&(e.GBs(x,5),e.GBs(me,5)),2&o){let i;e.mGM(i=e.lsd())&&(n.searchComponent=i.first),e.mGM(i=e.lsd())&&(n.verseContainers=i)}},hostBindings:function(o,n){1&o&&e.bIt("keydown",function(d){return n.onKeydown(d)},!1,e.tSv)},decls:2,vars:2,consts:[["verseContainer",""],["class","center",4,"ngIf"],["class","main-section mb-5 pb-5 bible-header","id","contentBlock",3,"scroll",4,"ngIf"],[1,"center"],["mode","indeterminate","value","50"],["id","contentBlock",1,"main-section","mb-5","pb-5","bible-header",3,"scroll"],[1,"container","pb-5","my-5"],[1,"title"],[1,"row"],["class","col",4,"ngIf"],[1,"my-5","filter-section"],[1,"d-flex","justify-content-between","mb-3","px-2","filters-wrapper"],[1,"search-section"],[3,"currentBook"],[1,"zoom-features","d-flex","justify-content-end","mb-3","align-items-center"],["mat-icon-button","",3,"click"],[1,"material-symbols-outlined"],[3,"currentChapter","currentBook","currentChapterIndex"],[1,""],[1,"mt-5"],["class","text-center chapter-num",4,"ngIf"],["class","verse-sec section-gap","id","zoom-container",4,"ngIf"],[3,"changeChapter","disableNext","disablePrev"],[1,"col"],[1,"text-center","chapter-book","chapter-name","mobile-only"],[1,"text-center","chapter-num"],["id","zoom-container",1,"verse-sec","section-gap"],[4,"ngFor","ngForOf"],[1,"verses","d-flex",3,"id"],[1,"verse-index"],[1,"verse-val",3,"mouseup","mousedown"]],template:function(o,n){1&o&&e.DNE(0,de,2,0,"div",1)(1,ge,26,8,"section",2),2&o&&(e.Y8G("ngIf",n.isLoading),e.R7$(),e.Y8G("ngIf",!n.isLoading&&n.currentChapter))},dependencies:[k.Sq,k.bT,s.iY,U.LG,W,se,x,ue],styles:[".main-section[_ngcontent-%COMP%]{margin-top:62px}.verse-sec[_ngcontent-%COMP%]{font-size:42px}.verse-sec[_ngcontent-%COMP%]   .verses[_ngcontent-%COMP%]{font-size:inherit;font-weight:500;margin:0 0 8px;line-height:1.6;color:#ccc}.verse-sec[_ngcontent-%COMP%]   .verses[_ngcontent-%COMP%]   .verse-val[_ngcontent-%COMP%]::selection, .verse-sec[_ngcontent-%COMP%]   .verses[_ngcontent-%COMP%]   .verse-index[_ngcontent-%COMP%]::selection{background:#fcde70!important;color:#1c222e!important}.verse-sec[_ngcontent-%COMP%]   .verses[_ngcontent-%COMP%]   .verse-val[_ngcontent-%COMP%]{margin-left:8px;display:inline-block}.chapter-num[_ngcontent-%COMP%]{font-size:32px;font-weight:500;color:#dcdcdc}.chapter-name[_ngcontent-%COMP%]{font-size:40px;color:#dcdcdc}.main-section[_ngcontent-%COMP%]{height:100vh;overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none}.zoom-features[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:5px}.zoom-features[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%]{color:#b3b3b3}@media screen and (max-width: 768px){.filter-section[_ngcontent-%COMP%]   .filters-wrapper[_ngcontent-%COMP%]{flex-direction:column}.verse-sec[_ngcontent-%COMP%]{font-size:24px}.chapter-name[_ngcontent-%COMP%]{font-size:20px}.search-section[_ngcontent-%COMP%]{flex-basis:auto}.zoom-features[_ngcontent-%COMP%]{justify-content:flex-start!important}}"]})}return r})()}];let Ce=(()=>{class r{static \u0275fac=function(o){return new(o||r)};static \u0275mod=e.$C({type:r});static \u0275inj=e.G2t({imports:[E.iI.forChild(ve),E.iI]})}return r})();var Se=p(3887),Be=p(9888);const Ie=[U.D6,T.vF,G.Hu,b.jL];let we=(()=>{class r{static \u0275fac=function(o){return new(o||r)};static \u0275mod=e.$C({type:r});static \u0275inj=e.G2t({imports:[k.MD,Ce,Se.G,g.YN,g.X1,Be.Pd,Ie]})}return r})()},9272:(Y,F,p)=>{p.d(F,{F:()=>V});var k=p(9172),E=p(6354),N=p(152),C=p(3294),R=p(5558),g=p(7673),b=p(4756),w=p(6464),e=p(3953);let V=(()=>{class S{dateFormat="M/d/yyyy";constructor(){}unSubscribeSubs(s){if(s&&s.length>b.Y.ZERO)for(const c of s)c.unsubscribe()}objKeysHasAtleastOneValue(s){let c=!1;const a=Object.keys(s).map(l=>s[l]);if(a&&a.length>b.Y.ZERO)for(const l of a){if(l&&""!==l.value&&null!=l.value){c=!0;break}c=!1}return c}removeItmesFromSorceArray(s,c,a){return s.length>b.Y.ZERO&&c.length>b.Y.ZERO&&a?s.filter(l=>!c.find(h=>l[a]===h[a])):s}removeInactiveItems(s){return s&&s.length>b.Y.ZERO?s.filter(c=>c.deletionFlag<=b.Y.ZERO):s}getHours(){const c=[...Array(25)].map((l,h)=>h).map((l,h)=>l<10?"0"+h:h.toString());return c.map(l=>parseInt(l)),c}generateYearsBetween(s=b.Y.TWO_THOUSAND,c=(new Date).getFullYear(),a){const l=c+b.Y.TWO;let h=[];for(var u=s;u<=l;u++)h.push(s),s++;return h}setFocus(s,c=b.Y.ZERO){s&&setTimeout(()=>s.focus(),c)}filteredData(s,c,a){const l=this.alphaNumericSort(c,a);return s.valueChanges.pipe((0,k.Z)(""),(0,E.T)(h=>{if(null===h)return l.slice();{const u=typeof h===w.g.number?h.toString():h,_=typeof u===w.g.string?u:u[a||""];return _?this.filter(_,l,a):l.slice()}}))}alphaNumericSort=(s,c)=>{const a=c&&""!==c;return s.filter(u=>a?""!==u[c]&&null!=u[c]:""!==u&&null!=u).sort((u,_)=>{const f=String(a?u[c]:u),I=String(a?_[c]:_);if(null==f||null==I)return 0;const y=x=>{const B=x.match(/\d+/);return B?parseInt(B[0],10):0};return y(f)-y(I)})};filteredDataComesFirst(s,c,a,l,h,u){u&&this.removeInactiveItems(c),h&&(c=this.removeDuplicates(c,a));const _=l?this.alphaNumericSort(c,a):c;return s.valueChanges.pipe((0,k.Z)(""),(0,N.B)(b.Y.TWO_HUNDERED),(0,C.F)(),(0,R.n)(f=>{if(!f||""===f)return(0,g.of)(_.slice());const I="number"==typeof f?f.toString():f,M=this.filter(("string"==typeof I?I:I[a||""]).trim().toLowerCase(),_,a);return _.filter(x=>!M.some(B=>a&&""!==a?x[a]===B[a]:x===B)),(0,g.of)([...M])}))}filterBooks(s,c,a){const l=c.slice();return s.valueChanges.pipe((0,k.Z)(""),(0,R.n)(h=>{if(!h||""===h)return(0,g.of)(l);const _=(typeof h===w.g.number?h.toString():h).toString().trim().toLowerCase(),f=this.filterByTransliteration(_,l,a);return(0,g.of)(f.length>0?f:l)}))}filterByTransliteration(s,c,a){return c.filter(l=>l[a]?.some(h=>h.toLowerCase().includes(s)))}convertNumToArray(s){return Array.from({length:s},(c,a)=>a+1)}removeDuplicates(s,c){const a=new Set;return s.filter(l=>{const h=c&&""!==c?l[c]:l;return!a.has(h)&&(a.add(h),!0)})}hasDuplicates(s,c){const a=new Set;for(const l of s){const h=l[c];if(a.has(h))return!0;a.add(h)}return!1}filter(s,c,a){return c.filter(l=>a&&""!==a?l[a].toString().toLowerCase().includes(s.toString().trim().toLowerCase()):l.toString().toLowerCase().includes(s.toString().toLowerCase()))}sortAlphaNum=(s,c)=>s.toString().localeCompare(c.toString(),"en",{numeric:!0});convertBase64toUnitArray(s){const c=atob(s),a=new Array(c.length);for(let l=0;l<c.length;l++)a[l]=c.charCodeAt(l);return new Uint8Array(a)}formatBytes(s,c=b.Y.TWO){if(0===s)return"0 Bytes";const l=c<=0?0:c,u=Math.floor(Math.log(s)/Math.log(1024));return parseFloat((s/Math.pow(1024,u)).toFixed(l))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][u]}shortName=(s,c)=>s&&s.length>c&&s.substring(b.Y.ZERO,c)+"..."||s;generateUinqueId(s){const c=Date.now().toString();return`${s}-${Math.random().toString(36).substring(2,10)}-${c}`}downloadJsonFile(s,c){const a=localStorage.getItem(s);if(a){const l=new Blob([a],{type:"application/json"}),h=window.URL.createObjectURL(l),u=document.createElement("a");u.href=h,u.download=c,document.body.appendChild(u),u.click(),document.body.removeChild(u),window.URL.revokeObjectURL(h)}}downloadJson(s,c){const a=localStorage.getItem(s);if(a){const h={data:JSON.parse(a)},u=new Blob([JSON.stringify(h)],{type:"application/json"}),_=window.URL.createObjectURL(u),f=document.createElement("a");f.href=_,f.download=c,document.body.appendChild(f),f.click(),document.body.removeChild(f),window.URL.revokeObjectURL(_)}}extractValues(s,c){return s.map(a=>{const l={};return Object.keys(a).forEach(h=>{l[h]=h===c&&a[h]?a[h].includes("<img")?"Image":a[h].replace(/<\/?[^>]+(>|$)/g,""):a[h]}),l})}static \u0275fac=function(c){return new(c||S)};static \u0275prov=e.jDH({token:S,factory:S.\u0275fac,providedIn:"root"})}return S})()}}]);