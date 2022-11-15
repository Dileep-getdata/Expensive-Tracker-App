window.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('no_rows').value=localStorage.getItem('RowsPerPage');
    console.log(localStorage.getItem('RowsPerPage'));

});
const dropDownForm=document.getElementById('dropDownForm');
dropDownForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    localStorage.setItem('RowsPerPage',e.target.no_rows.value);
    
});