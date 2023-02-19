(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();function p(n){var s=new FormData(n);const e=s.get("truth-table").split(`
`).map(r=>r.split(":")),u=s.getAll("logic-gates"),t=e.every((r,i,c)=>r[0].length===c[i-1>0?i-1:0][0].length&&r[1].length===c[i-1>0?i-1:0][1].length&&!r[0].match(/\D|[^0-1]/)&&!r[1].match(/\D|[^0-1]/)&&e.length===Math.pow(2,e[0][0].length)),o=e.every((r,i,c)=>r[0].length===c[i-1>0?i-1:0][0].length&&r[1].length===c[i-1>0?i-1:0][1].length)?e.every(r=>!r[0].match(/\D|[^0-1]/)&&!r[1].match(/\D|[^0-1]/))?t&&!e.length===Math.pow(2,e[0][0].length)?`Must be covered all possible varians: ${Math.pow(2,e[0][0].length)}, current: ${e.length}`:"":"Allowed only 1 and 0":"Each row must be same size",l=t?e[0][0].length:0,a=t?e[0][1].length:0;return{truthTable:e,logicGates:u,isValid:t,Error:o,IO:[l,a]}}function d(n,s){const e=[];return e.push(n&s),e.push(n|s),e.push(n^s),e.push(~n&15),e.push(~s&15),e.push(n>=s?n:0),e.push(n-s>0?n-s:0),e}function h(){const n=[],s=["AND","OR","XOR","NOT A","NOT B","CMP A","SUB A"];for(let e=0;e<=15;e++)for(let u=0;u<=15;u++){const t=d(e,u),o=[e,u];for(let l=0;l<t.length;l++)o.push(`${s[l]}: ${t[l]}`);n.push(o)}return n}function f(){const n=h(),s=document.createElement("div");s.classList.add("logic-output");let e=!0;for(let t=0;t<n.length;t++){const o=document.createElement("div");o.classList.add("input-output-set");const l=document.createElement("p");l.textContent=`a = ${n[t][0]}, b = ${n[t][1]}`,o.appendChild(l);const a=document.createElement("p");a.classList.add("output-wrapper");for(let r=2;r<n[t].length;r++){const i=document.createElement("span");i.textContent=n[t][r],i.setAttribute("data-category",n[t][r].substring(0,n[t][r].indexOf(":"))),a.appendChild(i)}if(o.appendChild(a),t%16===0&&!e){const r=document.createElement("div");r.classList.add("separator"),s.appendChild(r)}s.appendChild(o),e=!1}const u=document.querySelector(".logic-output");u?u.innerHTML=s.innerHTML:document.body.appendChild(s)}window.onload=function(){f()};document.getElementById("logic-tt").addEventListener("submit",function(n){n.preventDefault();const s=p(n.target);console.log(`${JSON.stringify(s)}`)});