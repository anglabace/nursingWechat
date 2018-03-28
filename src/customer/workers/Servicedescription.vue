<template>
    <div class="Servicedescription">
       <v-header></v-header>
       <h3>快康护理陪护价格</h3>
       <p class="digest">快康护理公司的陪护人员主要分为初级、中级、高级三个等级，不同的等级有不同的收费标准，实行优质优价，提供差异化服务，满足不同患者的服务需求。陪护费用主要以病人的病情、生活自理能力作为收费标准。主要分为三类：
       </p>
       <table class="table">
       	<tr>
       		<td>护工等级</td>
       		<td>一星服务</td>
       		<td>二星服务</td>
       		<td>三星服务</td>
       	</tr>
       	   	<tr>
       		<td>一星护工</td>
       		<td>120元</td>
       		<td>160元</td>
       		<td>200元</td>
       	</tr>
       	 <tr>
       		<td>二星护工</td>
       		<td>160元</td>
       		<td>200元</td>
       		<td>250元</td>
       	</tr>
       	 	   	<tr>
       		<td>三星护工</td>
       		<td>160元</td>
       		<td>200元</td>
       		<td>250元</td>
       	</tr>
       	 	   	<tr>
       		<td>四星护工</td>
       		<td>300以上</td>
       		<td>350以上</td>
       		<td>400以上</td>
       	</tr>
       	 	   	<tr>
       		<td>五星护工</td>
       		<td>300以上</td>
       		<td>350以上</td>
       		<td>400以上</td>
       	</tr>
       </table>
       <h3>服务详情说明</h3>
       <textarea class="textarea">
           一星（非卧床，病情较轻，生活部分能自理，例如：四肢骨折手法复位、关节腔切开引流术等）
	护理内容：
	1、协助病人洗脸、刷牙、梳头、擦身、泡脚、更换衣物、协助大小便、留取标本送检。
	2、做好病人餐具消毒工作，协助病人喝水、进餐（必要时喂饭)、协助饭后漱口、饭前便后洗手。
	3、根据医嘱协助病人吃药，及时准确，安排合理时间。
	4、整理床单、床头柜，做好病房清洁工作。
	5、医嘱及病情允许情况下，陪病人散步、聊天。
	6、每周一剃须、剪手脚指甲、遵医嘱洗头。
	初级护工主要为病人提供一对二的陪护服务，中级护工则是一对一服务，高级护工可提供二对一的陪护服务.
	
	二星（卧床，生活不能自理，病情趋向稳定的重症患者，例如：开放性骨折的处理、四肢长骨骨折切开复位内固定术、骨牵引术等）
	护理内容：
	1、协助病人洗脸、刷牙、梳头、擦身、泡脚、更换衣物、协助大小便、留取标本送检。
	2、做好病人餐具消毒工作，协助病人喝水、进餐（必要时喂饭)、协助饭后漱口、饭前便后洗手。
	3、根据医嘱协助病人吃药，及时准确，安排合理时间。
	4、整理床单、床头柜，做好病房清洁工作。
	5、保证患者安全，定时帮助翻身按摩受压皮肤，保证皮肤完整，无压疮发生。
	6、指导并协助患者进行相关的功能训练，避免常见并发症的发生，避免(压疮、便秘、瘢痕挛缩、深静脉血栓等)。
	7、了解病人睡眠情况，夜间动作轻柔，保持病室安静，调节光亮为病人创造良好的睡眠环境，根据情况增减盖被。
	8、每周一剃须、剪手脚指甲、遵医嘱洗头
	
	三星（卧床，生活严重不能自理，病情危重，随时可能发生病情变化的患者，例如：股骨胫骨骨折固定术、腰椎间盘髓核摘除术、颈椎椎体次全切除术、胸腰椎损伤内固定术、脊柱内固定术等）
	护理内容：
	1、24小时连续贴身监护照顾病人，为病人洗脸、刷牙、梳头、擦身、泡脚、更换衣物、清除大小便、留取标本送检。
	2、做好病人餐具消毒工作，给病人喝水、进餐（必要时喂饭)、协助饭后漱口、饭前便后洗手。
	3、根据医嘱给病人喂药，及时准确，安排合理时间。
	4、整理床单、床头柜，做好病房清洁工作。
	5、保证患者安全，定时帮助翻身按摩受压皮肤，保证皮肤完整，无压疮发生。
	6、指导并帮助患者进行相关的功能训练，避免常见并发症的发生，避免（压疮、便秘、瘢痕挛缩、深静脉血栓等）。
	7、根据医嘱准确测量病人的体温、呼吸、血压等生命体征、意识状态，及时发现问题并告知医务人员。
	8、了解病人睡眠情况，夜间动作轻柔，保持病室安静，调节光亮为病人创造良好的睡眠环境，根据情况增减盖被。
	9、每周一剃须、剪手脚指甲、遵医嘱洗头。
       </textarea>
    </div>
</template>
<script>
    import vHeader from './../common/Header.vue';
    import{Cell} from 'mint-ui';
    export default {
    	data(){
    		return {
    		
    		}
    	},
    		created() {
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		  this.$store.state.isFooterShow=false; //显示底部导航
    	},
        components:{
            vHeader,
            Cell
        }
    }
</script>
<style>
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.Servicedescription{ background: #fff; position: absolute; top:0;left:0;bottom: 0; right: 0; width: 100%; height: 100%; padding-top: 4rem; box-sizing: border-box;}
    .Servicedescription h3{font-size: 1.3rem; text-align: center; padding: 1rem 0;}
    .Servicedescription .digest{text-indent: 2rem; line-height: 1.7rem;}
    .Servicedescription .table{width:98%;border: 1px solid #eee; margin: 1rem auto 0;}
    .Servicedescription .table tr{border-bottom: 1px solid #eee; }
    .Servicedescription .table td{border-right: 1px solid #eee; text-align: center; padding: 1rem 0;}
    .Servicedescription  .textarea{ width:98%; margin: 0 auto; height:7rem; text-align:left}
</style>