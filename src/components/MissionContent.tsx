import type { Mission } from "@/lib/missions-data";

interface MissionContentProps {
  mission: Mission;
}

export function MissionContent({ mission }: MissionContentProps) {
  return (
    <div className="space-y-6">
      {/* Income Phases */}
      {mission.incomePhases?.map((phase, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4 sm:p-5">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
            {phase.phase} • {phase.period}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow label="💵 Lương cơ bản" value={phase.baseSalary} />
            <InfoRow label="📊 Hoa hồng" value={phase.commission} />
            <InfoRow label="🎯 KPI tối thiểu" value={phase.kpiMin} />
            <InfoRow label="🏆 KPI mục tiêu" value={phase.kpiTarget} />
            <InfoRow label="💰 Hoa hồng/đơn" value={phase.commissionPerDeal} />
            <InfoRow label="🔥 Thu nhập ước tính" value={phase.estimatedIncome} highlight />
            {phase.bonus && <InfoRow label="🎁 Bonus vượt KPI" value={phase.bonus} />}
          </div>
          <div className="mt-3 rounded-lg bg-purple-500/5 p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-purple-300">Trọng tâm:</span> {phase.focus}
            </p>
          </div>
        </div>
      ))}

      {/* Work Rules */}
      {mission.workRules?.map((rule, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-2 text-sm font-bold text-foreground">{rule.rule}</h4>
          <p className="text-sm text-muted-foreground">{rule.detail}</p>
        </div>
      ))}

      {/* Scenarios */}
      {mission.scenarios && (
        <div className="space-y-4">
          <div className="rounded-lg bg-purple-500/5 p-3">
            <p className="text-sm font-medium text-purple-300">
              💡 Phong cách bán hàng cốt lõi: Chuyên gia giáo dục khách hàng
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Không chiều khách, không ép mua — dẫn dắt khách tự nhận ra vấn đề và tự muốn mua.
            </p>
          </div>
          {mission.scenarios.map((sc, i) => (
            <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
              <h4 className="mb-3 text-sm font-bold text-foreground">{sc.title}</h4>
              <div className="space-y-2">
                <div className="rounded-lg bg-card p-3">
                  <p className="text-xs font-semibold text-muted-foreground">🙋 Khách nói:</p>
                  <p className="mt-1 text-sm italic text-foreground">"{sc.customerSays}"</p>
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: "rgba(160, 32, 240, 0.08)" }}>
                  <p className="text-xs font-semibold text-purple-300">💬 Sale phản hồi:</p>
                  <p className="mt-1 text-sm text-foreground">{sc.saleResponse}</p>
                </div>
                <div className="rounded-lg bg-card p-3">
                  <p className="text-xs font-semibold text-muted-foreground">🎯 Mục đích:</p>
                  <p className="mt-1 text-sm text-muted-foreground">{sc.purpose}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAQs */}
      {mission.faqs?.map((faq, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-2 text-sm font-bold text-foreground">
            Câu {i + 1}: {faq.question}
          </h4>
          <div className="mb-2 rounded-lg p-3" style={{ backgroundColor: "rgba(160, 32, 240, 0.08)" }}>
            <p className="text-xs font-semibold text-purple-300">✅ Trả lời chuẩn:</p>
            <p className="mt-1 text-sm text-foreground">{faq.answer}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">📝 Ghi chú:</span> {faq.note}
          </p>
        </div>
      ))}

      {/* Rejections */}
      {mission.rejections?.map((rej, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-2 text-sm font-bold text-foreground">
            Từ chối {i + 1}: {rej.type}
          </h4>
          <div className="mb-2 rounded-lg bg-card p-3">
            <p className="text-xs font-semibold text-muted-foreground">🛠️ Cách xử lý:</p>
            <p className="mt-1 text-sm text-foreground">{rej.handling}</p>
          </div>
          <div className="rounded-lg p-3" style={{ backgroundColor: "rgba(160, 32, 240, 0.08)" }}>
            <p className="text-xs font-semibold text-purple-300">💬 Câu nói mẫu:</p>
            <p className="mt-1 text-sm text-foreground">{rej.samplePhrase}</p>
          </div>
        </div>
      ))}

      {/* Lead Sources */}
      {mission.leadSources && (
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-3 text-sm font-bold text-foreground">📡 Nguồn lead đang khai thác:</h4>
          <ul className="space-y-2">
            {mission.leadSources.map((src, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 text-purple-400">•</span>
                {src}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sale Steps */}
      {mission.saleSteps?.map((step, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-2 text-sm font-bold text-foreground">{step.step}</h4>
          <p className="mb-3 text-xs text-muted-foreground">
            <span className="font-semibold text-purple-300">🎯 Mục tiêu:</span> {step.goal}
          </p>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">💬 Câu mẫu:</p>
            {step.samplePhrases.map((phrase, j) => (
              <p key={j} className="flex items-start gap-2 pl-2 text-sm text-foreground">
                <span className="mt-0.5 text-purple-400">→</span>
                {phrase}
              </p>
            ))}
          </div>
        </div>
      ))}

      {/* Downsale Strategy */}
      {mission.downsaleStrategy && (
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
          <h4 className="mb-2 text-sm font-bold" style={{ color: "#ffd700" }}>
            ⚡ Chiến thuật Downsale (khi khách chưa sẵn sàng mua core):
          </h4>
          <ul className="space-y-2">
            {mission.downsaleStrategy.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5" style={{ color: "#ffd700" }}>→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sale Tools */}
      {mission.saleTools && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Công cụ</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Mục đích</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Dùng ở</th>
              </tr>
            </thead>
            <tbody>
              {mission.saleTools.map((tool, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-3 font-medium text-purple-300">{tool.name}</td>
                  <td className="px-4 py-3 text-foreground">{tool.purpose}</td>
                  <td className="px-4 py-3 text-muted-foreground">{tool.usedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Customer Groups */}
      {mission.customerGroups?.map((group, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-2 text-sm font-bold text-foreground">{group.name}</h4>
          <div className="mb-3 space-y-1">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">🔍 Dấu hiệu:</span> {group.signs}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">📊 Trạng thái:</span> {group.status}
            </p>
          </div>
          <div className="mb-3 space-y-2">
            <p className="text-xs font-semibold text-purple-300">📋 Cách phản ứng:</p>
            {group.steps.map((s, j) => (
              <div key={j} className="rounded-lg bg-card p-3">
                <p className="text-sm text-foreground">
                  <span className="font-semibold text-purple-300">{s.step}:</span> {s.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-3" style={{ backgroundColor: "rgba(255, 215, 0, 0.08)" }}>
            <p className="text-xs font-semibold" style={{ color: "#ffd700" }}>
              ⚡ Quy tắc ghi nhớ 1 dòng:
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">{group.quickRule}</p>
          </div>
        </div>
      ))}

      {/* Case Studies */}
      {mission.caseStudies?.map((cs, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-3 text-sm font-bold text-foreground">
            Case {i + 1} — {cs.name}
          </h4>
          <div className="grid gap-2 sm:grid-cols-2">
            <InfoRow label="🏁 Xuất phát điểm" value={cs.startingPoint} />
            <InfoRow label="⚠️ Vấn đề" value={cs.problem} />
            <InfoRow label="✅ Kết quả" value={cs.result} />
            <InfoRow label="🎯 Dùng khi tư vấn cho" value={cs.useFor} />
          </div>
          <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: "rgba(160, 32, 240, 0.08)" }}>
            <p className="text-xs font-semibold text-purple-300">💬 Câu dẫn vào chuyện:</p>
            <p className="mt-1 text-sm italic text-foreground">{cs.leadIn}</p>
          </div>
        </div>
      ))}

      {/* Case Quick Ref */}
      {mission.caseQuickRef && (
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-3 text-sm font-bold" style={{ color: "#ffd700" }}>
            ⚡ Bảng tra nhanh — Dùng case nào cho ai:
          </h4>
          <div className="space-y-2">
            {mission.caseQuickRef.map((ref, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded-lg bg-card px-3 py-2">
                <span className="text-sm text-foreground">{ref.customerType}</span>
                <span className="shrink-0 text-sm font-semibold text-purple-300">→ {ref.caseName}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nurture Stages */}
      {mission.nurtureStages?.map((stage, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-2 text-sm font-bold text-foreground">{stage.stage}</h4>
          <div className="space-y-2">
            <div className="rounded-lg p-3" style={{ backgroundColor: "rgba(160, 32, 240, 0.08)" }}>
              <p className="text-xs font-semibold text-purple-300">📤 Gửi gì:</p>
              <p className="mt-1 text-sm text-foreground">{stage.sendWhat}</p>
            </div>
            <div className="rounded-lg bg-card p-3">
              <p className="text-xs font-semibold text-muted-foreground">🎯 Mục đích:</p>
              <p className="mt-1 text-sm text-foreground">{stage.purpose}</p>
            </div>
            {stage.extra && (
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">📝 Bổ sung sau:</span> {stage.extra}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Nurture Rules */}
      {mission.nurtureRules && (
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
          <h4 className="mb-3 text-sm font-bold" style={{ color: "#ffd700" }}>
            📋 Quy tắc Nurture cho Sale:
          </h4>
          <ul className="space-y-2">
            {mission.nurtureRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 font-bold" style={{ color: "#ffd700" }}>{i + 1}.</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Daily Checklist */}
      {mission.dailyChecklist?.map((block, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-3 text-sm font-bold text-foreground">{block.time}</h4>
          <ul className="space-y-2">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 text-purple-400">☐</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Product Tiers */}
      {mission.productTiers?.map((tier, i) => (
        <div key={i} className="rounded-xl border border-border bg-muted/20 p-4">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
            style={{
              backgroundColor: tier.tier === "FREE" ? "rgba(76, 175, 80, 0.15)" :
                tier.tier === "ENTRY" ? "rgba(33, 150, 243, 0.15)" :
                tier.tier === "CORE" ? "rgba(160, 32, 240, 0.15)" :
                "rgba(255, 215, 0, 0.15)",
              color: tier.tier === "FREE" ? "#4CAF50" :
                tier.tier === "ENTRY" ? "#2196F3" :
                tier.tier === "CORE" ? "#a020f0" :
                "#ffd700",
            }}
          >
            {tier.tier} — {tier.label}
          </div>
          <ul className="space-y-2">
            {tier.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 text-purple-400">•</span>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#bb86fc" }}>
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Community Links */}
      {mission.communityLinks && (
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <h4 className="mb-3 text-sm font-bold text-foreground">🌐 Cộng đồng:</h4>
          <div className="flex flex-wrap gap-2">
            {mission.communityLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-purple-500/20"
                style={{ color: "#bb86fc" }}
              >
                {link.name} ↗
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-card p-3">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className={`mt-1 text-sm font-medium ${highlight ? "text-purple-300" : "text-foreground"}`}>{value}</p>
    </div>
  );
}