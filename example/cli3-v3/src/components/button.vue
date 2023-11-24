<script lang="jsx">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'my-button',
    setup() {
        return () => (
            <div class="el-primary button">jsx模板</div>
        )
    }
})
</script>

<style></style>