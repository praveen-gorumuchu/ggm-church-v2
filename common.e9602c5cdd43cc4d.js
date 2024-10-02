"use strict";(self.webpackChunkggm_church=self.webpackChunkggm_church||[]).push([[76],{9272:(A,S,i)=>{i.d(S,{F:()=>M});var O=i(9172),B=i(6354),b=i(152),C=i(3294),D=i(5558),h=i(7673),l=i(4756),f=i(6464),R=i(3953);let M=(()=>{class d{dateFormat="M/d/yyyy";constructor(){}unSubscribeSubs(n){if(n&&n.length>l.Y.ZERO)for(const t of n)t.unsubscribe()}objKeysHasAtleastOneValue(n){let t=!1;const e=Object.keys(n).map(r=>n[r]);if(e&&e.length>l.Y.ZERO)for(const r of e){if(r&&""!==r.value&&null!=r.value){t=!0;break}t=!1}return t}removeItmesFromSorceArray(n,t,e){return n.length>l.Y.ZERO&&t.length>l.Y.ZERO&&e?n.filter(r=>!t.find(o=>r[e]===o[e])):n}removeInactiveItems(n){return n&&n.length>l.Y.ZERO?n.filter(t=>t.deletionFlag<=l.Y.ZERO):n}getHours(){const t=[...Array(25)].map((r,o)=>o).map((r,o)=>r<10?"0"+o:o.toString());return t.map(r=>parseInt(r)),t}generateYearsBetween(n=l.Y.TWO_THOUSAND,t=(new Date).getFullYear(),e){const r=t+l.Y.TWO;let o=[];for(var s=n;s<=r;s++)o.push(n),n++;return o}setFocus(n,t=l.Y.ZERO){n&&setTimeout(()=>n.focus(),t)}filteredData(n,t,e){const r=this.alphaNumericSort(t,e);return n.valueChanges.pipe((0,O.Z)(""),(0,B.T)(o=>{if(null===o)return r.slice();{const s=typeof o===f.g.number?o.toString():o,c=typeof s===f.g.string?s:s[e||""];return c?this.filter(c,r,e):r.slice()}}))}alphaNumericSort=(n,t)=>{const e=t&&""!==t;return n.filter(s=>e?""!==s[t]&&null!=s[t]:""!==s&&null!=s).sort((s,c)=>{const a=e?s[t]:s,u=e?c[t]:c;if(!a||!u)return 0;const m=E=>{const g=E.match(/\d+/);return g?parseInt(g[0],10):0};return m(a)-m(u)})};filteredDataComesFirst(n,t,e,r,o,s){s&&this.removeInactiveItems(t),o&&(t=this.removeDuplicates(t,e));const c=r?this.alphaNumericSort(t,e):t;return n.valueChanges.pipe((0,O.Z)(""),(0,b.B)(l.Y.TWO_HUNDERED),(0,C.F)(),(0,D.n)(a=>{if(!a||""===a)return(0,h.of)(c.slice());{const u=typeof a===f.g.number?a.toString():a,p=this.filter((typeof u===f.g.string?u:u[e||""]).trim(),c,e);return c.filter(E=>!p.some(g=>e&&""!==e?E[e]===g[e]:E===g)),(0,h.of)([...p])}}))}filterBooks(n,t,e){const r=t.slice();return n.valueChanges.pipe((0,O.Z)(""),(0,D.n)(o=>{if(!o||""===o)return(0,h.of)(r);const c=(typeof o===f.g.number?o.toString():o).toString().trim().toLowerCase(),a=this.filterByTransliteration(c,r,e);return(0,h.of)(a.length>0?a:r)}))}filterByTransliteration(n,t,e){return t.filter(r=>r[e]?.some(o=>o.toLowerCase().includes(n)))}convertNumToArray(n){return Array.from({length:n},(t,e)=>e+1)}removeDuplicates(n,t){const e=new Set;return n.filter(r=>{const o=t&&""!==t?r[t]:r;return!e.has(o)&&(e.add(o),!0)})}hasDuplicates(n,t){const e=new Set;for(const r of n){const o=r[t];if(e.has(o))return!0;e.add(o)}return!1}filter(n,t,e){return t.filter(r=>e&&""!==e?r[e].toString().toLowerCase().includes(n.toString().trim().toLowerCase()):r.toString().toLowerCase().includes(n.toString().toLowerCase()))}sortAlphaNum=(n,t)=>n.toString().localeCompare(t.toString(),"en",{numeric:!0});convertBase64toUnitArray(n){const t=atob(n),e=new Array(t.length);for(let r=0;r<t.length;r++)e[r]=t.charCodeAt(r);return new Uint8Array(e)}formatBytes(n,t=l.Y.TWO){if(0===n)return"0 Bytes";const r=t<=0?0:t,s=Math.floor(Math.log(n)/Math.log(1024));return parseFloat((n/Math.pow(1024,s)).toFixed(r))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][s]}shortName=(n,t)=>n&&n.length>t&&n.substring(l.Y.ZERO,t)+"..."||n;generateUinqueId(n){const t=Date.now().toString();return`${n}-${Math.random().toString(36).substring(2,10)}-${t}`}downloadJsonFile(n,t){const e=localStorage.getItem(n);if(e){const r=new Blob([e],{type:"application/json"}),o=window.URL.createObjectURL(r),s=document.createElement("a");s.href=o,s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(o)}else console.error("No data found in localStorage")}downloadJson(n,t){const e=localStorage.getItem(n);if(e){const o={data:JSON.parse(e)},s=new Blob([JSON.stringify(o)],{type:"application/json"}),c=window.URL.createObjectURL(s),a=document.createElement("a");a.href=c,a.download=t,document.body.appendChild(a),a.click(),document.body.removeChild(a),window.URL.revokeObjectURL(c)}else console.error("No data found in localStorage")}extractValues(n,t){return n.map(e=>{const r={};return Object.keys(e).forEach(o=>{r[o]=o===t&&e[o]?e[o].includes("<img")?"Image":e[o].replace(/<\/?[^>]+(>|$)/g,""):e[o]}),r})}static \u0275fac=function(t){return new(t||d)};static \u0275prov=R.jDH({token:d,factory:d.\u0275fac,providedIn:"root"})}return d})()}}]);