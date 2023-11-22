<script lang="jsx">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'my-button',
    setup() {
        return () => (
            <div class="el-primary button">jsx el-primary</div>
        )
    }
})
</script>

<style></style>