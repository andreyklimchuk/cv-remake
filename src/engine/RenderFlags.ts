import type * as THREE from 'three';
/** Alpha-tested meshes (hair cards) that must not enter GTAO's override (depth/normal) pass:
 *  the override material ignores alphaTest, so card quads would be solid there and smear AO / punch holes. */
export const NO_AO = new Set<THREE.Object3D>();
