type Boundaries = { origin: Position, terminal: Position }
namespace Custom {}
//% block="create upsidedown pyramid|at $origin=minecraftCreatePosition|length:$length|height:$height|levels:$levels|increase by:$increase_by|blocks:$blocks_list"
//% blockNamespace=Custom
function upsideDownPyramid(origin: Position, length: number, height: number, levels: number, increase_by: number, blocks_list: number[]) {
    const world_origin: Position = origin.toWorld();
    const origin_x: number = world_origin.getValue(Axis.X);
    const origin_y: number = world_origin.getValue(Axis.Y);
    const origin_z: number = world_origin.getValue(Axis.Z);

    const initial_xz_length:   number = Math.max(length - 1, 1);
    const level_y_interval:      number = Math.max(height - 1, 1);
    const pyramid_levels:      number = Math.max(levels - 1, 1);
    const half_of_increase_by: number = Math.ceil(increase_by / 2);


    const Bounds = (level_index: number, inner?: boolean): Boundaries => {
        const inner_offset: number = inner ? 1 : 0;
        const xz_index:     number = level_index - inner_offset;
        const y_index:      number = level_index;
        
        const level_xz_length: number = initial_xz_length + (xz_index * increase_by);

        const level_x: number = origin_x - (xz_index * half_of_increase_by);
        const level_y: number = origin_y + (y_index * level_y_interval);
        const level_z: number = origin_z - (xz_index * half_of_increase_by);

        const origin: Position = world(
            level_x,
            level_y,
            level_z
            );

        const terminal: Position = world(
            level_x + level_xz_length,
            level_y + level_y_interval,
            level_z + level_xz_length
        )
        return {origin, terminal}
    }
    const cmd_str = (bounds: Boundaries, _block?: Block): string => {
        const block = _block ? _block : AIR;        
        const command_str: string = "fill"
        const origin_str: string = bounds.origin.toString();
        const terminal_str: string = bounds.terminal.toString();
        const block_str: string = blocks.nameOfBlock(block);
        return [command_str, origin_str, terminal_str, block_str].join(" ")
    }

    for (let this_level = 0; this_level <= pyramid_levels; this_level++) {
        const outer_bounds = Bounds(this_level);
        const inner_bounds = Bounds(this_level, true);
        const fill_block = blocks_list.cycleIndex(this_level);
        
        player.execute(cmd_str(outer_bounds, fill_block));
        player.execute(cmd_str(inner_bounds));
        loops.pause(50)
    }
}
namespace helpers {
    export function cycleIndex<T>(array: T[], input_index: number): T {
        return array[input_index % array.length];
    };
}
interface Array<T> {
    //% block="%list|cycle index|%index" blockNamespace="arrays"
    //% helper=cycleIndex
    cycleIndex(index: number): T;
}
