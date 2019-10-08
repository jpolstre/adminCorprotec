<template>
	<div>
		<div id="drop-zone" contenteditable = "true">
			<!-- <img :src="src" width="250" id='imagen-pick' v-if="src"> -->
			<!-- <img :src="srcImg+'?t='+new Date().getTime()" :width="anchoImg" id='imagen-pick'> -->
			<img :src="srcImg+'?t='+new Date().getTime()" :width="anchoImg" v-if="anchoImg" id='imagen-pick'>
			
			<img :src="srcImg+'?t='+new Date().getTime()" v-else id='imagen-pick'>

			
		<!-- 	<img  src="~assets/default.png" width="250" id='imagen-pick' v-else> -->
		</div>


		<label class="file-select">
				<div class="select-button bg-primary">
					<span><q-icon  style="font-size: 2em;" name="add_photo_alternate" /> Seleccionar una imagen..</span>
					<!-- <span v-if="srcImg">Seleccionar una imagen: {{srcImg}}</span> -->
					<!-- <span v-else>Select File</span> -->
				</div>
				<input type="file" id="img-file" @change="seleccionar" accept="image/png, image/jpeg"/>
			</label>

		<!-- <input type="file" color="negative" id="img-file" 
		@change="seleccionar()"
		accept="image/png, image/jpeg"
		style="
				display: block;
				position: relative;
				top: 0px;
				left: 0px;

		" wait-for-ripple label="Cargar..." /> -->
		<!-- <input type="file" id="imgs" name="imgs" style="display:none;"> -->
	</div>
</template>

<script>
export default{
	/*'sendFormData'*/
	props:['srcImg', 'anchoImg'],//defauul image
	data(){
		return{
			fileImg:null,
		
		}
	},
	methods:{
		getFileImg(){
			return this.fileImg
		},
		reset(){
			let img = document.getElementById('imagen-pick')
			img.src = 'statics/blank.png?t='+Math.random()
			let imgFile = document.getElementById('img-file')
			imgFile.value = ''
			this.fileImg = null
		},
		seleccionar(){
			let self = this

			let dropZone = document.getElementById('drop-zone')
		
			let imgFile = document.getElementById('img-file')
			
			let reader = new FileReader()

			reader.onload = function(e2){
											
				let img = dropZone.getElementsByTagName('IMG')[0]

				img.src = e2.target.result

				// this_.sendFormData.append('imagen', imgFile.files[0])
				self.fileImg = {name:'imagen', value:imgFile.files[0]}
				// console.log(self.fileImg)
			}
			reader.readAsDataURL(imgFile.files[0])
		
		},
		dataURItoBlob(dataURI){
			var byteString, i, ia, j, mimeString, ref;
			if (dataURI.split(',')[0].indexOf('base64') >= 0) {
				byteString = atob(dataURI.split(',')[1]);
			} else {
				byteString = unescape(dataURI.split(',')[1]);
			}
			mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
			ia = new Uint8Array(byteString.length);
			for (i = j = 0, ref = byteString.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
				ia[i] = byteString.charCodeAt(i);
			}
			return new Blob([ia], {
				type: mimeString
			});
		},
			



		draggImagen(){
			let dropZone, antesHtml, dataValue, despuesHtml, htm, imgT, dataURL, files, this_ = this,imgs, blob, reader
			dropZone = document.getElementById('drop-zone')
			// imgFile.value = 'alguito'
			// dropZone.contenteditable = "true"
			
			 
			// dropZone.ondragover = function(e){
			// 	dropZone.contenteditable = "true"
			// }
			if (dropZone){
						dropZone.ondrop =  function(e){
				dropZone.contenteditable="false"
				// antesHtml = dropZone.innerHTML
				try{
					dataValue = e.dataTransfer.getData('text/uri-list')
				}
				catch(e){
					dataValue = e.dataTransfer.getData('URL')
				}

				
				if(dataValue){ 
					// # imagen from url
					setTimeout(function(){
				

						// console.log(dataValue)

						imgs = dropZone.getElementsByTagName('IMG')
						// console.log(imgs.length)
						if(imgs[0].id && imgs[0].id==='imagen-pick'){
							if(imgs[1]){
								imgs[0].src = imgs[1].src
							}
							
						
						}else{
							if(imgs[0]){
								imgs[1].src = imgs[0].src
							}
						
						
						}
						//remover toda la basura
						var c = dropZone.children;
						for (var i = 0; i < c.length; i++) {
							if (c[i].id) {
								if(c[i].id!=='imagen-pick'){
									dropZone.removeChild(c[i])
								}else{
										// dataURL = c[i].src
										// this_.sendFormData.append('urlimagen', c[i].src)
										this_.fileImg = {name:'urlimagen', value:c[i].src}

								}
							}else{
								dropZone.removeChild(c[i])
							}
						}

				
						// dataURL = imgT.src
						// if( dataURL[0].toLowerCase() !== 'h'){//src="data:"
						// 	blob = this_.dataURItoBlob(dataURL)
						// 	this_.sendFormData.append('imagen', blob)
						// 	reader = new FileReader()
						// 	reader.readAsDataURL(blob) //# start reading the file data.
						// }else{	//src="http"
						// 	this_.sendFormData.append('urlimagen', imgT.src)
						// }
					},1000)

				
				}
				else{
					let files, file , reader, nameFile, img, j, len
					e.stopPropagation()
					e.preventDefault()

					files = e.dataTransfer.files// #Array of all files
					
					for (j = 0, len = files.length; j < len; j++) {
						file = files[j]
						if(file.type.match(/image.*/)){
							
							reader = new FileReader()
							nameFile = file.name
							reader.onload = function(e2) {
								
								// img = document.createElement('img')
								img = dropZone.getElementsByTagName('IMG')[0]
								// console.log(e2.target.result)
								img.src = e2.target.result
								// img.width = 250
								// img.height = 200
								// img.id = 'imagen-pick'
								// dropZone.innerHTML = ''
								// return dropZone.appendChild(img)
								// console.log(file)
								// this_.sendFormData.append('imagen', file)
								this_.fileImg = {name:'imagen', value:file}


							}
							reader.readAsDataURL(file)
						}
					}
				}
				// console.log(this_.sendFormData)
			}
			}


		}
	},
	
	mounted(){//con created no funcion debe ser despues de dibujado del elemento
		let imgFile = document.getElementById('img-file')
		imgFile.value = ''
	
		this.draggImagen()
		// console.log(this.srcImg)
	}
}
	
</script>
<style lang="stylus" scoped>
.file-select > .select-button
	cursor pointer
	padding 0 1rem
	line-height 50px
	color white
	// background-color: green;

	border-radius .2rem

	text-align center
	// font-weight: bold;
	// width: 250px;
	width 100%
	height 50px


.file-select > input[type="file"] {
	display: none;
}
// #img-file
// 	width: 50px
// 	padding: 0 0 0 10px
// 	margin-left: 26px
#drop-zone
	padding 10px
	border 1px dotted #ccc
	text-align center
	// width 252px
	width 100%
	// cursor pointer
	// height 280px
		
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	user-select: none;
	
</style>