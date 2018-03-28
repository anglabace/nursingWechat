<template id="modal-template">
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<slot name="header">系统提示</slot>
						<span class="modal-header-stop" v-on:click="$emit('close')">
							<i class="iconfont">&#xe64e</i>
							</span>
					</div>
					<div class="modal-body">
						<slot name="body">default body</slot>
					</div>
					<div class="modal-footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
