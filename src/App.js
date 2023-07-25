import React, { useEffect, useState } from "react";
import { options, ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import {
  OnChainRegistry,
  signCertificate,
  PinkContractPromise,
} from "@phala/sdk";

const App = () => {
  const [api, setApi] = useState(null);
  const [keyring, setKeyring] = useState(null);
  const [contract, setContract] = useState(null);
  const [phatRegistry, setPhatRegistry] = useState(null);
  const contractId =
    "0x795b0df111c4248662e5051a205de06adc3a952c99816011b3f826e834c12071"; // Replace with the actual address of your Ink contract
  const metadata = getMetaData();
  //const pair = keyring.addFromUri("//Alice");
  //const abi = JSON.parse(fs.readFileSync("./flipper.json", "utf-8"));

  useEffect(() => {
    const provider = new WsProvider("wss://poc5.phala.network/ws"); // Replace with your node's WebSocket endpoint
    ApiPromise.create(
      options({
        provider: new WsProvider(provider),
        noInitWarn: true,
      })
    ).then((api) => {
      setApi(api);
      setKeyring(new Keyring({ type: "sr25519" }));
      console.log(api);
      asyncCall();
    });

    async function asyncCall() {
      const phatRegistryTemp = await OnChainRegistry.create(api);
      //setPhatRegistry(phatRegistryTemp);
      /* const contractKey = await phatRegistry.getContractKeyOrFail(contractId);
      const contractTemp = new PinkContractPromise(
        api,
        phatRegistry,
        metadata,
        contractId,
        contractKey
      );
      setContract(contractTemp);*/
      //const cert = await signCertificate({ pair, api });
      console.log(contract);
    }

    return () => {
      if (api) api.disconnect();
    };
  }, []);

  // Rest of your cod

  return <div>{/* Your React component UI */}</div>;
};

function getMetaData() {
  const metadata = {
    source: {
      hash: "0x502745344c57820c79c114576826fbc2b924fb2d2a750ef06f52508abd1e28a3",
      language: "ink! 4.2.1",
      compiler: "rustc 1.69.0",
      build_info: {
        build_mode: "Debug",
        cargo_contract_version: "3.0.1",
        rust_toolchain: "stable-aarch64-apple-darwin",
        wasm_opt_settings: {
          keep_debug_symbols: false,
          optimization_passes: "Z",
        },
      },
    },
    contract: {
      name: "flipper",
      version: "0.1.0",
      authors: ["[your_name] <[your_email]>"],
    },
    spec: {
      constructors: [
        {
          args: [
            { label: "init_value", type: { displayName: ["bool"], type: 0 } },
          ],
          default: false,
          docs: [
            "Constructor that initializes the `bool` value to the given `init_value`.",
          ],
          label: "new",
          payable: false,
          returnType: {
            displayName: ["ink_primitives", "ConstructorResult"],
            type: 1,
          },
          selector: "0x9bae9d5e",
        },
        {
          args: [],
          default: false,
          docs: [
            "Constructor that initializes the `bool` value to `false`.",
            "",
            "Constructors can delegate to other constructors.",
          ],
          label: "default",
          payable: false,
          returnType: {
            displayName: ["ink_primitives", "ConstructorResult"],
            type: 1,
          },
          selector: "0xed4b9d1b",
        },
      ],
      docs: [],
      environment: {
        accountId: { displayName: ["AccountId"], type: 5 },
        balance: { displayName: ["Balance"], type: 8 },
        blockNumber: { displayName: ["BlockNumber"], type: 11 },
        chainExtension: { displayName: ["ChainExtension"], type: 12 },
        hash: { displayName: ["Hash"], type: 9 },
        maxEventTopics: 4,
        timestamp: { displayName: ["Timestamp"], type: 10 },
      },
      events: [],
      lang_error: { displayName: ["ink", "LangError"], type: 3 },
      messages: [
        {
          args: [],
          default: false,
          docs: [
            " A message that can be called on instantiated contracts.",
            " This one flips the value of the stored `bool` from `true`",
            " to `false` and vice versa.",
          ],
          label: "flip",
          mutates: true,
          payable: false,
          returnType: { displayName: ["ink", "MessageResult"], type: 1 },
          selector: "0x633aa551",
        },
        {
          args: [],
          default: false,
          docs: [" Simply returns the current value of our `bool`."],
          label: "get",
          mutates: false,
          payable: false,
          returnType: { displayName: ["ink", "MessageResult"], type: 4 },
          selector: "0x2f865bd9",
        },
      ],
    },
    storage: {
      root: {
        layout: {
          struct: {
            fields: [
              {
                layout: { leaf: { key: "0x00000000", ty: 0 } },
                name: "value",
              },
            ],
            name: "Flipper",
          },
        },
        root_key: "0x00000000",
      },
    },
    types: [
      { id: 0, type: { def: { primitive: "bool" } } },
      {
        id: 1,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 2 }], index: 0, name: "Ok" },
                { fields: [{ type: 3 }], index: 1, name: "Err" },
              ],
            },
          },
          params: [
            { name: "T", type: 2 },
            { name: "E", type: 3 },
          ],
          path: ["Result"],
        },
      },
      { id: 2, type: { def: { tuple: [] } } },
      {
        id: 3,
        type: {
          def: {
            variant: { variants: [{ index: 1, name: "CouldNotReadInput" }] },
          },
          path: ["ink_primitives", "LangError"],
        },
      },
      {
        id: 4,
        type: {
          def: {
            variant: {
              variants: [
                { fields: [{ type: 0 }], index: 0, name: "Ok" },
                { fields: [{ type: 3 }], index: 1, name: "Err" },
              ],
            },
          },
          params: [
            { name: "T", type: 0 },
            { name: "E", type: 3 },
          ],
          path: ["Result"],
        },
      },
      {
        id: 5,
        type: {
          def: { composite: { fields: [{ type: 6, typeName: "[u8; 32]" }] } },
          path: ["ink_primitives", "types", "AccountId"],
        },
      },
      { id: 6, type: { def: { array: { len: 32, type: 7 } } } },
      { id: 7, type: { def: { primitive: "u8" } } },
      { id: 8, type: { def: { primitive: "u128" } } },
      {
        id: 9,
        type: {
          def: { composite: { fields: [{ type: 6, typeName: "[u8; 32]" }] } },
          path: ["ink_primitives", "types", "Hash"],
        },
      },
      { id: 10, type: { def: { primitive: "u64" } } },
      { id: 11, type: { def: { primitive: "u32" } } },
      {
        id: 12,
        type: {
          def: { variant: {} },
          path: ["ink_env", "types", "NoChainExtension"],
        },
      },
    ],
    version: "4",
    phat: {
      contractId:
        "0x795b0df111c4248662e5051a205de06adc3a952c99816011b3f826e834c12071",
    },
  };

  return metadata;
}

export default App;
