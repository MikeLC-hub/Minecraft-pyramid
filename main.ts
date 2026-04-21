player.onItemInteracted(COMPASS, function () {
    blocks.fill(
    AIR,
    pos(-10, 0, -10),
    pos(10, 40, 10),
    FillOperation.Replace
    )
})
player.onItemInteracted(RECOVERY_COMPASS, function () {
    pyramid(pyramid_origin, _length, _height, _levels, _increase_by, _blocks_list)
})
function pyramid (origin: Position, length: number, height: number, levels: number, increase_by: number, blocks_list: any[]) {
    world_origin = origin.toWorld()
    minecraft_length = length - 1
    minecraft_height = height - 1
    minecraft_levels = levels - 1
    half_of_increase_by = Math.ceil(increase_by / 2)
    for (let this_level = 0; this_level <= minecraft_levels; this_level++) {
        level_length = minecraft_length + this_level * increase_by
        origin_x = world_origin.getValue(Axis.X) - this_level * half_of_increase_by
        origin_y = world_origin.getValue(Axis.Y) + this_level * minecraft_height
        origin_z = world_origin.getValue(Axis.Z) - (this_level - half_of_increase_by)
        level_origin = world(origin_x, origin_y, origin_z)
        level_terminal = positions.add(
        level_origin,
        pos(level_length, minecraft_height, level_length)
        )
        blocks.fill(
        cycleArray(blocks_list, this_level),
        level_origin,
        level_terminal,
        FillOperation.Replace
        )
        blocks.fill(
        AIR,
        positions.add(
        level_origin,
        pos(half_of_increase_by, 0, half_of_increase_by)
        ),
        positions.add(
        level_terminal,
        pos(0 - half_of_increase_by, 0, 0 - half_of_increase_by)
        ),
        FillOperation.Replace
        )
        loops.pause(100)
    }
}
function cycleArray (array: number[], input_index: number) {
    return array[input_index % array.length]
}
let level_terminal: Position = null
let level_origin: Position = null
let origin_z = 0
let origin_y = 0
let origin_x = 0
let level_length = 0
let half_of_increase_by = 0
let minecraft_levels = 0
let minecraft_height = 0
let minecraft_length = 0
let world_origin: Position = null
let _blocks_list: number[] = []
let _increase_by = 0
let _levels = 0
let _height = 0
let _length = 0
let pyramid_origin: Position = null
let cycled_index = 0
let last_index = 0
pyramid_origin = world(0, 0, 0)
_length = 10
_height = 4
_levels = 10
_increase_by = 2
_blocks_list = [RED_CONCRETE, ORANGE_CONCRETE, MAGENTA_CONCRETE]
