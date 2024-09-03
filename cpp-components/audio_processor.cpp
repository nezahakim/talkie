#include <iostream>
#include <vector>
#include <cmath>

class AudioProcessor {
public:
    static std::vector<float> processAudio(const std::vector<float>& input, float sampleRate) {
        std::vector<float> output(input.size());

        // Simple noise reduction (high-pass filter)
        const float RC = 1.0 / (2 * M_PI * 100); // 100 Hz cutoff frequency
        const float dt = 1.0 / sampleRate;
        const float alpha = dt / (RC + dt);

        float lastOutput = 0;
        for (size_t i = 0; i < input.size(); ++i) {
            output[i] = alpha * (input[i] - lastOutput + output[i]);
            lastOutput = output[i];
        }

        // Apply some gain
        const float gain = 1.2f;
        for (float& sample : output) {
            sample *= gain;
            // Simple limiter to prevent clipping
            if (sample > 1.0f) sample = 1.0f;
            if (sample < -1.0f) sample = -1.0f;
        }

        return output;
    }

    static std::vector<uint8_t> compressAudio(const std::vector<float>& input) {
        std::vector<uint8_t> compressed;
        compressed.reserve(input.size());

        for (float sample : input) {
            // Convert float [-1, 1] to uint8_t [0, 255]
            uint8_t compressedSample = static_cast<uint8_t>((sample + 1) * 127.5f);
            compressed.push_back(compressedSample);
        }

        return compressed;
    }

    static std::vector<float> decompressAudio(const std::vector<uint8_t>& compressed) {
        std::vector<float> decompressed;
        decompressed.reserve(compressed.size());

        for (uint8_t sample : compressed) {
            // Convert uint8_t [0, 255] back to float [-1, 1]
            float decompressedSample = (static_cast<float>(sample) / 127.5f) - 1;
            decompressed.push_back(decompressedSample);
        }

        return decompressed;
    }
};
