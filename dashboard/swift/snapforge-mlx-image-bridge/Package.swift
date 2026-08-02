// swift-tools-version: 6.2
import PackageDescription

let package = Package(
    name: "snapforge-mlx-image-bridge",
    platforms: [.macOS(.v26)],
    products: [
        .executable(name: "snapforge-mlx-inpaint", targets: ["SnapForgeMLXInpaint"]),
        .executable(name: "snapforge-mlx-colorize", targets: ["SnapForgeMLXColorize"]),
    ],
    dependencies: [
        .package(url: "https://github.com/xocialize/mlx-lama-swift", branch: "main"),
        .package(url: "https://github.com/xocialize/mlx-ddcolor-swift", branch: "main"),
    ],
    targets: [
        .executableTarget(
            name: "SnapForgeMLXInpaint",
            dependencies: [
                .product(name: "LaMa", package: "mlx-lama-swift"),
                .product(name: "MIGAN", package: "mlx-lama-swift"),
            ]
        ),
        .executableTarget(
            name: "SnapForgeMLXColorize",
            dependencies: [
                .product(name: "DDColor", package: "mlx-ddcolor-swift"),
            ]
        ),
    ]
)
