$( document ).ready(function() {
  $('#menu-kegiatan-tambah').addClass('mm-active');
  $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });

});

function submitkegiatan(){
  var formData = new FormData();
  var files = $('#customFile')[0].files;

  formData.append('file_data',files[0]);
  formData.append('indikator_ssd',$('#indikator_ssd').val());
  formData.append('indikator_manager', $('#indikator_manager').val());
  formData.append('uraian_indikator',$('#uraian_indikator').val());
  formData.append('kegiatan',$('#kegiatan').val());
  formData.append('tanggal',$('#tanggal').val());

  $.ajax({
      type: 'post',
      url:'submitkegiatan',
      data: formData,
      contentType: false,
      processData: false,
      success:function(result){
        swal(
          "Sukses!",
          "Tambah Kegiatan!",
          "success"
        ).then((value) => {
          window.location.href = '/kegiatan';
        });
      }
    });
}
