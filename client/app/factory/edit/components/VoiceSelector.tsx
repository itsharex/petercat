import React, { useEffect, useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import type { Updater } from 'use-immer';
import { voiceOptions } from '@/data/DeafultVoice';
import { BotProfile } from '@/app/interface';

interface VoiceSelectorProps {
  botProfile?: BotProfile;
  setBotProfile?: Updater<BotProfile>;
}

const VoiceSelector = (props: VoiceSelectorProps) => {
  const { botProfile, setBotProfile } = props;
  const [selectedVoice, setSelectedVoice] = useState('');
  useEffect(() => {
    if (botProfile?.voice) {
      setSelectedVoice(botProfile?.voice);
    }
  }, [botProfile?.voice]);
  return (
    <Select
      items={voiceOptions}
      label="Voice"
      placeholder="Select a voice"
      selectionMode="single"
      labelPlacement="outside"
      selectedKeys={[selectedVoice]}
      classNames={{
        base: 'w-full',
        trigger: 'h-12',
      }}
      onChange={(e) => {
        const selectedValue = e.target.value;
        setSelectedVoice(selectedValue);
        setBotProfile?.((draft: BotProfile) => {
          draft.voice = selectedValue;
        });
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <div className="flex flex-col">
              <span>{item.data?.id}</span>
              <span className="text-default-500 text-tiny">
                {item.data?.desc}
              </span>
            </div>
          </div>
        ));
      }}
    >
      {(voice) => (
        <SelectItem key={voice.id} textValue={voice?.id}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small">{voice.id}</span>
              <span className="text-tiny text-default-400">{voice.desc}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default VoiceSelector;